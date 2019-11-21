const { parseEvents } = require('./src/kinesis');
const getEventHandler = require('./src/event_handler_factory');
const config = require('./src/config');
const Dlq = require('./src/sqs_dlq');

exports.handler = async function (event, context) {
    const dlq = new Dlq(config);
    try {
        return await Promise.all(parseEvents(event).map(getEventHandler).map(f => f(config)));
    } catch(ex) {
        if(config.getConsumerEnabled()) {
            await dlq.put(ex, event)
        } else {
            console.log('Consumer Disabled: failed to process event: ', { event, exception: ex } )
        }

    }
};