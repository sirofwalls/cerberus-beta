const BaseEvent = require('../../utils/structures/BaseEvent');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class GuildCreateEvent extends BaseEvent {
  constructor() {
    super('guildDelete');
  }
  
  async run(client, guild) {
    try {
        const guildconfig = await GuildConfig.deleteOne({
          guildId: guild.id,
        })
        console.log(client.user.tag + ' has left a server and the info has been deleted');
    } catch (err) {
      console.log(err);
    }
  }
}