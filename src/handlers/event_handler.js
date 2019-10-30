const handleApprovalEvent = require('./approval_handler');

async function handleEvent(event, config, approve, parse) {
    const eventType = event.metadata.eventType;
    switch (eventType) {
        case "salesforce-application-arc-approved":
            return handleApprovalEvent(event, config, approve, parse);
        default:
            console.log(`Arc approval event handler has no handler for event type ${eventType}`);
            return async () => {};
    }
}

module.exports = handleEvent;