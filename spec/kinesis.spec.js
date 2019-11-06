const { parseEvents } = require('../src/kinesis');
const { readFileSync } = require('fs');
const { expect } = require('chai');

describe('getEventData', () => {
  it('can parse input data to event data', () => {
    const event = JSON.parse(readFileSync('spec/data/input_two_events.json'));
    const busEvents = parseEvents(event);
    expect(busEvents.length).to.equal(2);
  });
});
