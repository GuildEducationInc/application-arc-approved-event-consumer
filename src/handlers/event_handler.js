const handleApprovalEvent = require('./approval_handler');
const approve = require('../applications/approve');
const parse = require('../event/parse');

async function handleEvent(event, config) {
    switch (event.metadata.eventType) {
        case "salesforce-application-arc-approved":
            return handleApprovalEvent(event, config, approve, parse);
        default:
            return async () => {};
    }
}

module.exports = handleEvent;