if [ -z "$CIRCLE_BRANCH"  ]; then
	echo "Not running in circle."
	exit 1
elif [ "$CIRCLE_BRANCH" == develop ]; then
	aws configure set region "${AWS_DEFAULT_REGION}"
  aws configure set aws_access_key_id "${AWS_ACCESS_KEY_ID_DEV}"
  aws configure set aws_secret_access_key "${AWS_SECRET_ACCESS_KEY_DEV}"
	exit 0
elif [ "$CIRCLE_BRANCH" == master  ]; then
	aws configure set region "${AWS_DEFAULT_REGION}"
  aws configure set aws_access_key_id "${AWS_ACCESS_KEY_ID_PROD}"
  aws configure set aws_secret_access_key "${AWS_SECRET_ACCESS_KEY_PROD}"
	exit 0
else 
	echo "Should only be used on branches develop or master."
	exit 1
fi
