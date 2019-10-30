function getAcademicServiceUrl() {
    return 'https://academic.dev-guild-cloud.com/graphql'
    //return process.env.ACADEMIC_SERVICE_API_URL;
}

function getApiKey() {
    return '5185fe87-19ea-42fd-bc62-d183ab680d1b'
    //return process.env.API_KEY;
}

module.exports = { getAcademicServiceUrl, getApiKey };