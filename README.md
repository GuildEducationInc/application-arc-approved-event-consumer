# Salesforce Application State Changed Event Consumer

## Local Development
1. Clone the repo.
2. Install the dependencies: `npm install`.
3. Run the tests `npm test`.

## Deploy
Run `STAGE=dev make` to deploy to dev.
Run `make clean` to cleanup the deploy artifacts.

## About
1. Consumes `salesforce-application-state-changed` events from the event bus.
2. Uses the genesis application id on the event to call academic services' `approveApplication` mutation.

These events are of the form:
```$json
{
  "metadata": {
    "eventType": "salesforce-application-state-changed"
  },
  "genesis_application_id": "64995336-e331-4ea2-9447-2e449c0ce121",
  "state_changed_at": "2019-09-10T12:03:57Z",
  "from_state": "",
  "to_state": ""
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
        "data": "ewogICJtZXRhZGF0YSI6IHsKICAgICJldmVudFR5cGUiOiAic2FsZXNmb3JjZS1hcHBsaWNhdGlvbi1zdGF0ZS1jaGFuZ2VkIgogIH0sCiAgImdlbmVzaXNfYXBwbGljYXRpb25faWQiOiAiNjQ5OTUzMzYtZTMzMS00ZWEyLTk0NDctMmU0NDljMGNlMTIxIiwKICAic3RhdGVfY2hhbmdlZF9hdCI6ICIyMDE5LTA5LTEwVDEyOjAzOjU3WiIsCiAgImZyb21fc3RhdGUiOiAiIiwKICAidG9fc3RhdGUiOiAiIgp9",
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
        "eventType": "salesforce-application-state-changed"
      },
      "genesis_application_id": "<id-goes-here>",
      "state_changed_at": "2019-09-10T12:03:57Z",
      "from_state": "",
      "to_state": ""
    }
  ]
}
```
Use either the genesis ID of an existing application or create a new application with a custom
genesis application ID.