const { approve, revertApproval } = require('./application');
const { ApprovalError, RevertApprovalError } = require('./errors');

async function handleApprovalEvent(config) {
  const { genesis_application_id: genesisApplicationId, state_changed_at: stateChangedAt } = this;
  let applicationId;
  try {
    applicationId = await approve(genesisApplicationId, stateChangedAt, config);
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

async function handleRevertApprovalEvent(config) {
  const { genesis_application_id: genesisApplicationId } = this;
  let applicationId;
  try {
    applicationId = await revertApproval(genesisApplicationId, config);
  } catch (error) {
    if (error instanceof RevertApprovalError) {
      applicationId = 'error';
      console.log(`An error occurred reverting approval: ${error.message}`);
    } else {
      throw error;
    }
  }
  return applicationId;
}

module.exports = { handleApprovalEvent, handleRevertApprovalEvent };
