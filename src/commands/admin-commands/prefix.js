const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class PrefixCommand extends BaseCommand {
  constructor() {
    super('prefix', 'admin', [], 'Sets the prefix for the server. Only Admins can use it.');
  }
  
  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const guildId = message.guild.id;
    const parseArgs = args.slice(1).toLowerCase().trim().split('-');
    const prefixUpdate = parseArgs[0];
    if ((prefixUpdate.length <= 3) && (prefixUpdate.length > 0)) {
        const prefixData = await GuildConfig.findOneAndUpdate({guildId}, {prefix: prefixUpdate}, {upsert: true});
        if (prefixData) {
            message.channel.send(`The new Prefix is \`${prefixUpdate}\``).then((replyMessage) => {
              replyMessage.delete({timeout: 2000})
            });
        } else (err) => {
            message.reply('There was an issue updating the prefix');
            console.log(err);
        }
    } else {
        message.reply('The prefix needs to be 1-3 characters long').then((replyMessage) => {
          replyMessage.delete({timeout: 2000})
        });
    }
  }
}