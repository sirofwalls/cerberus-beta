const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class MemberLogCommand extends BaseCommand {
  constructor() {
    super('memberlog', 'admin', ['ml'], 'Sets the channel in the database for the announcement of a memebr joining or leaving.');
  }
  
  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const guildId = message.guild.id;
    const memberChannel = message.mentions.channels.first();
    if (memberChannel) {
      const memberLogChannel = memberChannel.id;
      const memberLogData = await GuildConfig.findOneAndUpdate({guildId}, {memeberLogChannel: memberLogChannel}, {upsert: true});
      const logChannel = client.channels.cache.get(memberLogChannel).name;
      if (memberLogData) {
          message.channel.send(`The new Member Log Channel is \`#${logChannel}\``).then((replyMessage) => {
            replyMessage.delete({timeout: 2000});
            message.delete({timeout: 200});
          });
      } else (err) => {
          message.reply('There was an issue updating the Member Log Channel');
      }
    } else {
        message.reply('That channel does not exist, or it is not a valid channel.').then((replyMessage) => {
          replyMessage.delete({timeout: 2000});
          message.delete({timeout: 200});
        });
    }
  }
}