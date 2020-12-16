const BaseEvent = require('../../utils/structures/BaseEvent');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    const prefixFetch = await GuildConfig.findOne({guildId: message.guild.id});
    const prefix = prefixFetch.get('prefix');
    if (message.content.startsWith(prefix)) {
      let cmdName = message.content.split(new RegExp(/\s+/)).shift().slice(prefix.length).toLowerCase();
      let cmdArgs = message.content.slice(prefix.length + cmdName.length +1);

      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}