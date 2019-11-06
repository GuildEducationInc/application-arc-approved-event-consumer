function parseEvent(record) {
  return JSON.parse(Buffer.from(record.kinesis.data, 'base64').toString('ascii'));
}

function parseEvents(kinesis_event) {
  return kinesis_event.Records.map(parseEvent);
}

module.exports = { parseEvents };
