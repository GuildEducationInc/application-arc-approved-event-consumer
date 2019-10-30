function parse(event) {
    let genesisApplicationId, approvalDate;
    genesisApplicationId = event.genesis_application_id;
    if (genesisApplicationId === undefined) throw new Error("Error parsing application id from event.");
    approvalDate = event.arc_approval_date;
    if (approvalDate === undefined) throw new Error("Error parsing approval date from event");
    guildUuid = event.guild_uuid;
    return { genesisApplicationId, approvalDate, guildUuid }
}

module.exports = parse;