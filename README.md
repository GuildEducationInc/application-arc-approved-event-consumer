# Application Arc Approved Event Consumer

## Local Development
1. Clone the repo.
2. Install the dependencies: `npm install`.
3. Run the tests `npm test`.

## Deploy
Run `STAGE=dev make` to deploy to dev.
Run `make clean` to cleanup the deploy artifacts.

## About
Consume `salesforce-application-arc-approved` events from the event bus.

These events are of the form:
```$json
{
  "metadata": {
    "eventType": "salesforce-application-arc-approved"
  },
  "genesis_application_id": "64995336-e331-4ea2-9447-2e449c0ce121",
  "arc_approval_date": "2019-09-10T12:03:57Z"
}
```


## Direct Invoke Testing
You can invoke the lambda by base64 encoding an event into the data field of the
following json or similar.
```$json
{
  "Records": [
    {
      "kinesis": {
        "kinesisSchemaVersion": "1.0",
        "partitionKey": "1",
        "sequenceNumber": "49590338271490256608559692538361571095921575989136588898",
        "data": "ewogICJtZXRhZGF0YSI6IHsKICAgICJldmVudFR5cGUiOiAic2FsZXNmb3JjZS1hcHBsaWNhdGlvbi1hcmMtYXBwcm92ZWQiCiAgfSwKICAiZ2VuZXNpc19hcHBsaWNhdGlvbl9pZCI6ICI2NDk5NTMzNi1lMzMxLTRlYTItOTQ0Ny0yZTQ0OWMwY2U2MjEiLAogICJhcmNfYXBwcm92YWxfZGF0ZSI6ICIyMDE5LTA5LTEwVDEyOjAzOjU3WiIsCiAgImd1aWxkX3V1aWQiOiAiOTFjMDg3MzQtNjI4My00ZTA1LTkyNTUtMjkxMjg0ZDgwZDhkIgp9",
        "approximateArrivalTimestamp": 1545084650.987
      },
      "eventSource": "aws:kinesis",
      "eventVersion": "1.0",
      "eventID": "shardId-000000000006:49590338271490256608559692538361571095921575989136588898",
      "eventName": "aws:kinesis:record",
      "invokeIdentityArn": "arn:aws:iam::123456789012:role/lambda-kinesis-role",
      "awsRegion": "us-east-2",
      "eventSourceARN": "arn:aws:kinesis:us-east-2:123456789012:stream/lambda-stream"
    }
  ]
}
```

## Event Bus Testing
You can direct invoke enqueueing an event into the event bus to test that the
lambda is consuming events off of the `salesforce-${STAGE}` kinesis stream.
```$json
{
  "action": "enqueue",
  "producer": "salesforce",
  "events": [
    {
      "metadata": {
        "eventType": "salesforce-application-arc-approved"
      },
      "genesis_application_id": "<id-goes-here>",
      "arc_approval_date": "2019-09-10T12:03:57Z"
    }
  ]
}
```
Use either the genesis ID of an existing application or create a new application with a custom
genesis application ID.