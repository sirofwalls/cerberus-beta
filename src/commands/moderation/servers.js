const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ServersCommand extends BaseCommand {
  constructor() {
    super('servers', 'moderation', []);
  }

  async run(client, message, args) {
    if (message.type === 'DM') return;
    if (message.member.id === '200372249717506048'){
      client.guilds.cache.forEach(guild => {
          message.author.send(
              `${guild.name} has a total of ${guild.memberCount} members`
          );
          message.delete({timeout: 500});
      });
    } else {
      message.reply(`This server \`(${client.guilds.cache.get(message.guild.id).name})\` has ${client.guilds.cache.get(message.guild.id).memberCount} members`);
    }
  }
}