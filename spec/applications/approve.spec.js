const approve = require("../../src/applications/approve");
const {expect} = require('chai');
const fetchMock = require('fetch-mock');
const config = require('../mocks/config');

describe('approve', () => {
    it('returns the id of the updated application when successful', async () => {
        const successBody = {
            data: {
                approveApplication: {
                    id: "f62ee52a-63d5-44c5-8d90-d45e72abf120"
                }
            }
        };
        fetchMock.mock(config.getAcademicServiceUrl(), {body: successBody, status: 200});
        const result = await approve({
            genesisApplicationId: '64995336-e331-4ea2-9447-2e449c0ce621',
            approvalDate: '2019-09-10T12:03:57Z'
        }, config);
        expect(result).to.equal('f62ee52a-63d5-44c5-8d90-d45e72abf120');
    });
    it('throws an error when the status code is not 200', async () => {
        fetchMock.mock(config.getAcademicServiceUrl(), {body: {}, status: 403});
        try {
            await approve({
                genesisApplicationId: '64995336-e331-4ea2-9447-2e449c0ce621',
                approvalDate: '2019-09-10T12:03:57Z'
            }, config);
            throw new Error('Can\'t reach.');
        } catch (ex) {
            expect(ex.message).to.contain('403')
        }
    });
    it('throws an error when the graphql returns errors', async () => {
        const message1 = "This is an error message.";
        const message2 = "This is another error message.";
        const errorBody = {
            errors: [
                {message: message1},
                {message: message2}
            ]
        };
        fetchMock.mock(config.getAcademicServiceUrl(), {body: errorBody, status: 200});
        try {
            await approve({
                genesisApplicationId: '64995336-e331-4ea2-9447-2e449c0ce621',
                approvalDate: '2019-09-10T12:03:57Z'
            }, config);
            throw new Error('Can\'t reach.');
        } catch (ex) {
            expect(ex.message).to.contain(message1);
            expect(ex.message).to.contain(message2)
        }
    });
    afterEach(fetchMock.reset)
});
