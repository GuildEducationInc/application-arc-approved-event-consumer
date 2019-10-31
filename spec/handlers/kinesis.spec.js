const { getEventData } = require('../../src/handlers/kinesis');
const { readFileSync } = require('fs');
const { expect } = require('chai');

describe('getEventData', () => {
  it('can parse input data to event data', () => {
    const event = JSON.parse(readFileSync('spec/handlers/input_two_events.json'));
    const busEvents = event.Records.map(getEventData);
    expect(busEvents.length).to.equal(2);
  });
});
