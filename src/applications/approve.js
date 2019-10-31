global.fetch = require('node-fetch');
const { ApprovalError } = require('../errors/errors');

/**
 * Builds an error message from a graphql response
 * @param errors
 * @returns {string}
 */
function buildErrorMessage(errors) {
  let errorMessage = 'Failed Failed to approve application:';
  for (message of errors.map(e => e.message)) {
    errorMessage += `\n\t* ${message}`;
  }
  return errorMessage;
}

/**
 * Accepts an applications genesis application id and approval date and returns the application id
 * if an application was successfully updated, otherwise throws.
 * @param genesisApplicationId
 * @param approvalDate
 * @param config
 * @returns {Promise<string>}
 */
async function approve({ genesisApplicationId, approvalDate }, config) {
  const { getAcademicServiceUrl, getApiKey } = config;
  const response = await fetch(getAcademicServiceUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getApiKey()}` },
    body: JSON.stringify({
      query: `mutation {
                    approveApplication(
                    input: {
                        genesisApplicationId: "${genesisApplicationId}",
                        approvedAt: "${approvalDate}"
                    }) {
                        id
                    }
                }`,
    }),
  });
  if (response.status !== 200) {
    throw new Error(`Failed to query graphql: ${response.status}.`);
  }
  const body = await response.json();
  if (body.errors !== undefined) {
    throw new ApprovalError(buildErrorMessage(body.errors));
  }
  const applicationId = body.data.approveApplication.id;
  console.log(`Application: ${applicationId} approved.`);
  return applicationId;
}

module.exports = approve;
