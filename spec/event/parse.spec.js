const parse = require('../../src/event/parse.js');
const {expect} = require('chai');
const {readFileSync} = require('fs');

describe('parse', () => {
    let eventWithoutGuildUuid;
    let eventWithGuildUuid;
    let eventWithoutApplicationId;
    let eventWithoutApprovalDate;
    beforeEach(() => {
        eventWithoutGuildUuid = JSON.parse(readFileSync('spec/event/event_without_guild_uuid.json'));
        eventWithGuildUuid = JSON.parse(readFileSync('spec/event/event_with_guild_uuid.json'));
        eventWithoutApplicationId = JSON.parse(readFileSync('spec/event/event_without_application_id.json'));
        eventWithoutApprovalDate = JSON.parse(readFileSync('spec/event/event_without_approval_date.json'));
    });
    it('parses the date and application id out of the event body', () => {
        const {genesisApplicationId, approvalDate, guildUuid} = parse(eventWithoutGuildUuid);
        expect(genesisApplicationId).to.equal('fcab358c-3005-4bb5-ad55-668721285b61');
        expect(approvalDate).to.equal('2019-09-10T12:03:57Z');
        expect(guildUuid).to.be.undefined;
    });
    it('parses the date and application id out of the event body', () => {
        const {genesisApplicationId, approvalDate, guildUuid} = parse(eventWithGuildUuid);
        expect(genesisApplicationId).to.equal('fcab358c-3005-4bb5-ad55-668721285b61');
        expect(approvalDate).to.equal('2019-09-10T12:03:57Z');
        expect(guildUuid).to.equal('91c08734-6283-4e05-9255-291284d80d8d');
    });
    it('errors when an event is missing application id', () => {
        try {
            parse(eventWithoutApplicationId);
            throw new Error('Can\'t reach.');
        } catch (ex) {
            expect(ex.message).to.contain('application id')
        }
    });
    it('errors when an event missing arc approval date', () => {
        try {
            parse(eventWithoutApprovalDate);
            throw new Error('Can\'t reach.');
        } catch (ex) {
            expect(ex.message).to.contain('approval date')
        }
    })
});