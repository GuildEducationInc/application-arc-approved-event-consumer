async function approvalHandler(event, context, config, approve, parse, getEventData) {
    return await Promise.all(event.Records.map(getEventData).map(parse)
        .map((id, approvalDate) => approve(id, approvalDate, config)))
}

module.exports = approvalHandler;