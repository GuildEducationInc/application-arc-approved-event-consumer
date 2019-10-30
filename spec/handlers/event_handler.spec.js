const handleEvent = require('../../src/handlers/event_handler');
const config = require('../mocks/config');
const parse = require('../../src/event/parse');
const { getEventData } = require('../../src/handlers/kinesis');
const {readFileSync} = require('fs');
const {expect} = require('chai');

const approve = async ({ genesisApplicationId }) => {
    return genesisApplicationId;
};

describe('eventHandler', () => {
    it('delegates to the approval handler and calls approve', async () => {
        const input = JSON.parse(readFileSync('spec/handlers/input_one_event.json'));
        const events = input.Records.map(getEventData);
        const result = await handleEvent(events[0], config, approve, parse);
        expect(result).to.equal("64995336-e331-4ea2-9447-2e449c0ce621")
    })
});