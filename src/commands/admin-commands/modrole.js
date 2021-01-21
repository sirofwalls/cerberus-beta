const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class ModRoleCommand extends BaseCommand {
  constructor() {
    super('modrole', 'admin', ['mr']);
  }
  
  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const guildId = message.guild.id;
    const parseArgs = args.slice(1).toLowerCase().trim().split('-');
    const modRole = parseArgs[0];
    const moderRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === modRole);
    if (moderRole) {
        const memberLogData = await GuildConfig.findOneAndUpdate({guildId}, {moderatorRole: moderRole.name}, {upsert: true});
        if (memberLogData) {
            message.channel.send(`The new Moderator Role is \`${moderRole.name}\``).then((replyMessage) => {
              replyMessage.delete({timeout: 2000})
            });
            message.delete({timeout: 200});
        } else (err) => {
            message.reply('There was an issue updating the Moderator Role');
            console.log(err);
        }
    } else {
        message.reply('That role does not exist').then((replyMessage) => {
          replyMessage.delete({timeout: 2000})
        });
    }
  }
}