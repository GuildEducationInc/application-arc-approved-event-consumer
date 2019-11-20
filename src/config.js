module.exports = {
  getApiKey: () => {
    return process.env.API_KEY;
  },
  getAcademicServiceUrl: () => {
    return process.env.ACADEMIC_API_URL;
  },
  getDlqUrl: () => {
    return process.env.DLQ_URL;
  },
  getConsumerEnabled: () => {
    return process.env.CONSUMER_ENABLED === 'true';
  }
};
