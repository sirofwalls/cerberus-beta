const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class MemberLogCommand extends BaseCommand {
  constructor() {
    super('memberlog', 'admin', ['ml'], 'Sets the channel in the database for the announcement of a memebr joining or leaving.');
  }
  
  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const guildId = message.guild.id;
    const parseArgs = args.slice(1).toLowerCase().trim().split('-');
    const memberChannel = parseArgs[0];
    if ((memberChannel.length <= 21) && (memberChannel.length > 0)) {
        const memberLogData = await GuildConfig.findOneAndUpdate({guildId}, {memeberLogChannel: memberChannel}, {upsert: true});
        const logChannel = client.channels.cache.get(memberChannel).name;
        if (memberLogData) {
            message.channel.send(`The new Member Log Channel is \`#${logChannel}\``).then((replyMessage) => {
              replyMessage.delete({timeout: 2000})
            });
            message.delete({timeout: 200});
        } else (err) => {
            message.reply('There was an issue updating the Member Log Channel');
        }
    } else {
        message.reply('The Member Log Channel ID needs to be 1-21 characters long').then((replyMessage) => {
          replyMessage.delete({timeout: 2000})
        });
    }
  }
}