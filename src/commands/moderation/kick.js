const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {

    if (message.type === 'DM') return;

    const modRoleFetch = await GuildConfig.findOne({guildId: message.guild.id});
    const guildRoleCheck = modRoleFetch.get('moderatorRole');
    if (!guildRoleCheck) return;
    const moderRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === modRoleFetch.get('moderatorRole').toLowerCase());
    if (!moderRole) {
      message.reply('It looks like that role no longer exists');
      return;
    }
    const roleCheck = message.member.roles.cache.has(moderRole.id);
    
    if (roleCheck) {

      const {mentions} = message;
      const target = mentions.users.first();

      if (target) {
        const targetMember = message.guild.members.cache.get(target.id);
        const sniperMember = `${message.author.username}#${message.author.discriminator}`
        targetMember.kick([`Kicked by ${sniperMember}`]);
        message.channel.send(`${targetMember} was kicked`);
        message.delete({timeout: 500});
  
      } else {
        message.reply('You need to mention a user to kick');
        message.delete({timeout: 500});
      }
    } else {
      message.reply('You do not have the correct role to execute this command.');
    }
  }
}