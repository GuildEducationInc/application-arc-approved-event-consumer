prefix = aws-jumpcloud exec guild-${STAGE} --
ifdef CI
prefix =
endif

all: package.zip package.${STAGE}.yaml
	$(prefix) sam deploy --template-file package.${STAGE}.yaml \
	--stack-name salesforce-application-state-changed-event-consumer-us-west-2-${STAGE} --capabilities CAPABILITY_IAM \
	--parameter-overrides StageName=${STAGE}

package.${STAGE}.yaml: template.yaml package.zip
	$(prefix) sam package --template-file template.yaml \
	--s3-bucket guild-${STAGE}-lambda-artifacts-us-west-2 --output-template-file package.${STAGE}.yaml

package.zip: package
	cd package && zip -r ../package.zip * && cd ..

package: index.js $(shell find src -type f) $(shell find node_modules -type f)
	npm install --only production
	rsync -r --files-from=deploy_files.txt . package

clean:
	rm -rf package
	rm -f package.zip
	rm -f package.${STAGE}.yaml
	rm -rf node_modules