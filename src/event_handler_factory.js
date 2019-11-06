const {handleApprovalEvent, handleRevertApprovalEvent} = require('./approval_handler');

function getEventHandler(event) {
    const eventType = event.metadata.eventType;
    switch (eventType) {
        case 'salesforce-application-state-changed':
            return getStateChangedEvent(event);
        default:
            console.log(`Salesforce application state changed event handler has no handler for event type ${eventType}`);
            return () => {
            };
    }
}

function getStateChangedEvent(event) {
    const { to_state: toState, from_state: fromState } = event;
    if (toState === 'Approved, ARC') {
        return handleApprovalEvent.bind(event);
    } else if (fromState === 'Approved, ARC') {
        if (toState !== 'Application Sent, University') {
            return handleRevertApprovalEvent.bind(event);
        }
    }
    console.log(`No handler available for state combination from_state:${fromState} to_state${toState}.`);
    return () => { };
}

module.exports = getEventHandler;