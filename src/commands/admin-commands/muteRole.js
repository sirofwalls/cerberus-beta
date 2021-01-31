const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class MuteRoleCommand extends BaseCommand {
  constructor() {
    super('muterole', 'admin', [], 'Defines a role in the database that a Mod can use to text mute a person.');
  }
  
  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const guildId = message.guild.id;
    const mutedRole = message.mentions.roles.first();
    if (mutedRole) {
        const memberLogData = await GuildConfig.findOneAndUpdate({guildId}, {mutedRole: mutedRole.name}, {upsert: true});
        if (memberLogData) {
            message.channel.send(`The new Muted Role is \`${mutedRole.name}\``).then((replyMessage) => {
              replyMessage.delete({timeout: 2000});
              message.delete({timeout: 200});
            });
        } else (err) => {
            message.reply('There was an issue updating the Muted Role');
        }
    } else {
        message.reply('That role does not exist, or is not a valid role').then((replyMessage) => {
          replyMessage.delete({timeout: 2000});
          message.delete({timeout: 200});
        });
    }
  }
}