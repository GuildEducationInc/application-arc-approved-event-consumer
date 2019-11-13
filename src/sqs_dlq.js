const { SQS } = require('@aws-sdk/client-sqs-node');

class SqsDlq {
    constructor(config) {
        this.config = config;
        this.sqs = new SQS({})
    }

    buildMessage(error, event) {
        return {
            MessageAttributes: {
                "Event": {
                    DataType: "String",
                    StringValue: JSON.stringify(event)
                },
                "Stacktrace": {
                    DataType: "String",
                    StringValue: error.stack
                }
            },
            MessageBody: error.toString(),
            QueueUrl: this.config.getDlqUrl()
        }
    }

    async put(error, event) {
        const message = this.buildMessage(error, event);
        try {
            console.log(`An error occurred while processing an event. ${error}.`);
            await this.sqs.sendMessage(message);
        } catch(ex) {
            console.log(`Error putting failed event on DLQ ${ex}.`)
        }
    }
}

module.exports = SqsDlq;