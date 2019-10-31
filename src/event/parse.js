function parse(event) {
  const {
    genesis_application_id: genesisApplicationId,
    arc_approval_date: approvalDate,
    guild_uuid: guildUuid,
  } = event;
  if (genesisApplicationId === undefined)
    throw new Error('Error parsing application id from event.');
  if (approvalDate === undefined) throw new Error('Error parsing approval date from event');
  return { genesisApplicationId, approvalDate, guildUuid };
}

module.exports = parse;
