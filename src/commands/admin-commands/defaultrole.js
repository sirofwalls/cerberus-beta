const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class DefaultRoleCommand extends BaseCommand {
  constructor() {
    super('defaultrole', 'admin', ['df'], 'Defines a role in the database that the bot will add to someone automatically on joining the server.');
  }
  
  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    const guildId = message.guild.id;
    const parseArgs = args.slice(1).toLowerCase().trim().split('-');
    const defaultRole = parseArgs[0];
    const defactoRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === defaultRole);
    if (defactoRole) {
        const memberLogData = await GuildConfig.findOneAndUpdate({guildId}, {defaultRole: defactoRole.name}, {upsert: true});
        if (memberLogData) {
            message.channel.send(`The new Deafult Role is \`${defactoRole.name}\``);
            message.delete({timeout: 200});
        } else (err) => {
            message.reply('There was an issue updating the Default Role');
        }
    } else {
        message.reply('That role does not exist')
    }
  }
}