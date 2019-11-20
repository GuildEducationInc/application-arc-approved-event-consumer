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

## Turning on the consumer
The end-to-end flow of Salesforce events -> Academic Service is currently still in development, so this consumer is `disabled` by default. To enable the feature,
edit the `Makefile` file so that the `ConsumerEnabled` paramater-override passed to the sam deploy command is `true` rather than `false` and re-deploy the stack.



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

## Working With the DLQ
1. Log into the AWS Management Console via Jumpcloud and navigate to the Simple Queue Service home page.
2. Select the salesforce-application-state-changed-event-handler-dlq-prod queue.
3. Click the 'Queue Actions' dropdown and select 'View/Delete Messages'.
4. Click 'Start Polling for Messages' to see the list of messages in the queue.
5. Each message has an `Event` and `Stacktrace` corresponding to the error that occurred.
6. When the solution to the error(s) is found, apply the solution, which may involve editing the event bus event. Repost each failed event to the event bus manually, following the instructions on how to post event bus events listed above. Delete messages that have handled from the queue.