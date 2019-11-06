const { parseEvents } = require('./src/kinesis');
const getEventHandler = require('./src/event_handler_factory');
const config = require('./src/config');

exports.handler = async function (event, context) {
    return await Promise.all(parseEvents(event).map(getEventHandler).map(f => f(config)));
};