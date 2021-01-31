const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class DefaultRoleCommand extends BaseCommand {
  constructor() {
    super('defaultrole', 'admin', ['df'], 'Defines a role in the database that the bot will add to someone automatically on joining the server.');
  }
  
  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const guildId = message.guild.id;
    const defactoRole = message.mentions.roles.first();
    if (defactoRole) {
        const memberLogData = await GuildConfig.findOneAndUpdate({guildId}, {defaultRole: defactoRole.name}, {upsert: true});
        if (memberLogData) {
            message.channel.send(`The new Default Role is \`${defactoRole.name}\``).then((replyMessage) => {
              replyMessage.delete({timeout: 2000});
              message.delete({timeout: 200});
            });
        } else (err) => {
            message.reply('There was an issue updating the Default Role');
        }
    } else {
        message.reply('That role does not exist, or is not a valid role').then((replyMessage) => {
          replyMessage.delete({timeout: 2000});
          message.delete({timeout: 200});
        });
    }
  }
}