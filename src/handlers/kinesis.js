function getEventData(record) {
  return JSON.parse(Buffer.from(record.kinesis.data, 'base64').toString('ascii'));
}

module.exports = { getEventData };
