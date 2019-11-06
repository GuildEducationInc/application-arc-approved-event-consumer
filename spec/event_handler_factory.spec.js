const getEventHandler = require('../src/event_handler_factory.js');
const config = require('./config');
const { parseEvents } = require('../src/kinesis');
const { readFileSync } = require('fs');
const { expect } = require('chai');

describe('eventHandler', () => {
  it('delegates to the approval handler', async () => {
    const input = JSON.parse(readFileSync('spec/data/input_one_event_approve.json'));
    const events = parseEvents(input);
    const result = await getEventHandler(events[0], config);
    expect(result.name).to.equal('bound handleApprovalEvent');
  });
  it('delegates to the revert handler', async () => {
    const input = JSON.parse(readFileSync('spec/data/input_one_event_revert.json'));
    const events = parseEvents(input);
    const result = await getEventHandler(events[0], config);
    expect(result.name).to.equal('bound handleRevertApprovalEvent');
  });
});
