module.exports = {
    getApiKey: () => {
        return process.env.API_KEY;
    },
    getAcademicServiceUrl: () => {
        return process.env.ACADEMIC_API_URL;
    },
};
