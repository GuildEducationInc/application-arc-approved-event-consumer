const { ApprovalError } = require('../errors/errors');
// This is a super nit but the indentation of all of this is a little different from our normal JS repos,
// would be nice to implement prettier here so future us doesnt have to context switch from parsing
// code differently :)
async function handleApprovalEvent(event, config, approve, parse) {
    let applicationId;
    try {
        applicationId = await approve(parse(event), config);
    } catch(error) {
        if(error instanceof ApprovalError) {
            applicationId = 'error';
            console.log(`An error occurred processing approval event: ${error.message}`)
        } else {
            throw error;
        }
    }
    return applicationId
}

module.exports = handleApprovalEvent;