const { ApprovalError } = require('../errors/errors');

async function handleApprovalEvent(event, config, approve, parse) {
  let applicationId;
  try {
    applicationId = await approve(parse(event), config);
  } catch (error) {
    if (error instanceof ApprovalError) {
      applicationId = 'error';
      console.log(`An error occurred processing approval event: ${error.message}`);
    } else {
      throw error;
    }
  }
  return applicationId;
}

module.exports = handleApprovalEvent;
