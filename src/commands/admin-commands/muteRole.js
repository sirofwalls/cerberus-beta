const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class MuteRoleCommand extends BaseCommand {
  constructor() {
    super('muterole', 'admin', [], 'Defines a role in the database that a Mod can use to text mute a person.');
  }
  
  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const guildId = message.guild.id;
    const parseArgs = args.slice(1).toLowerCase().trim().split('-');
    const muteRole = parseArgs[0];
    const mutedRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === muteRole);
    if (mutedRole) {
        const memberLogData = await GuildConfig.findOneAndUpdate({guildId}, {mutedRole: mutedRole.name}, {upsert: true});
        if (memberLogData) {
            message.channel.send(`The new Muted Role is \`${mutedRole.name}\``);
            message.delete({timeout: 200});
        } else (err) => {
            message.reply('There was an issue updating the Muted Role');
            console.log(err);
        }
    } else {
        message.reply('That role does not exist')
    }
  }
}