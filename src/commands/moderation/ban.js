const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', [], 'Bans a user from the server. Only memebrs with the designated role in the database can use this command.');
  }

  async run(client, message, args) {

    if (message.guild.me.hasPermission("BAN_MEMBERS")){
      const modRoleFetch = await GuildConfig.findOne({guildId: message.guild.id});
      const guildRoleCheck = modRoleFetch.get('moderatorRole');

      if (guildRoleCheck) {
        const moderRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === modRoleFetch.get('moderatorRole').toLowerCase());
        if (moderRole) {
          const roleCheck = message.member.roles.cache.has(moderRole.id);
        
          if (roleCheck) {

            const {mentions} = message;
            const target = mentions.users.first();

            if (target) {
              try {
                const targetMember = message.guild.members.cache.get(target.id);
                const sniperMember = `${message.author.username}#${message.author.discriminator}`;

                await targetMember.ban({days: 0, reason: `Banned by ${sniperMember}`})
                .then(() => {
                  message.channel.send(`${targetMember} was banned`)
                })
              } catch (err) {
                if (err.code === 50013) {
                  message.reply('There was an error softbanning that member because they have a higher role than me.');
                }
              }
            } else {
              message.reply('You need to mention a user to ban');
            }
          } else {
            message.reply('You do not have the correct role to execute this command.');
          }
        } else {
          message.reply('It looks like the moderator role needed no longer exists');
        }
      } else {
        message.reply('A Moderator role has not been defined yet. Talk to the server Admin.');
      }
    } else (
      message.reply('I do not have the correct permissions to do that. Talk with the Server Admin')
    )

    
  }
}