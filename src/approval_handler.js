const {approve, revertApproval} = require('./application');

async function handleApprovalEvent(config) {
    const {genesis_application_id: genesisApplicationId, state_changed_at: stateChangedAt} = this;
    return await approve(genesisApplicationId, stateChangedAt, config);
}

async function handleRevertApprovalEvent(config) {
    const {genesis_application_id: genesisApplicationId} = this;
    return await revertApproval(genesisApplicationId, config);
}

module.exports = {handleApprovalEvent, handleRevertApprovalEvent};
