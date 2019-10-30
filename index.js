const handleEvent = require('./src/handlers/event_handler');
const config = require('./src/config/environment_config');
const { getEventData } = require('./src/handlers/kinesis');
const approve = require('./src/applications/approve');
const parse = require('./src/event/parse');

exports.handler = async function(event, context) {
    return await Promise.all(event.Records.map(getEventData).map(e => handleEvent(e, config, approve, parse)));
};