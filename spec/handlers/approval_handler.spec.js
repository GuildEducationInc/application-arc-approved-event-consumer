const config = require('../mocks/config');
const handleApprovalEvent = require('../../src/handlers/approval_handler');
const { readFileSync } = require('fs');
const { expect } = require('chai');

describe('approvalHandler', () => {
  const approve = () => {
    return Promise.resolve('some-id');
  };
  const parse = () => {
    return { genesisApplicationId: 'some-genesis-id', approvalDate: 'some-timestamp' };
  };
  it('approves an application', async () => {
    const input = JSON.parse(readFileSync('spec/handlers/input_one_event.json'));
    const result = await handleApprovalEvent(input, config, approve, parse);
    expect(result).to.equal('some-id');
  });
});
