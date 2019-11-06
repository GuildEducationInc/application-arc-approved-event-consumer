module.exports = {
  getAcademicServiceUrl: () => {
    return process.env.ACADEMIC_API_URL;
  },
  getApiKey: () => {
    return process.env.API_KEY;
  },
};
