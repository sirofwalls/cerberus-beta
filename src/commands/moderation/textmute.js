const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class TextMuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', [], 'Text Mutes a user in the server so they can no logner type in any text channels. Only memebrs with the designated role in the database can use this command');
  }

  async run(client, message, args) {

    if (message.guild.me.hasPermission("MANAGE_ROLES")){
      const dbFetch = await GuildConfig.findOne({guildId: message.guild.id});
      const guildRoleCheck = dbFetch.get('moderatorRole');

      if (guildRoleCheck) {
        const moderRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === dbFetch.get('moderatorRole').toLowerCase());
        if (moderRole) {
            const guildMuteCheck = dbFetch.get('mutedRole');
            if (guildMuteCheck) {
                const muteRole = message.guild.roles.cache.find(role => role.name.toLowerCase() === dbFetch.get('mutedRole').toLowerCase());
                if (muteRole) {
                    const roleCheck = message.member.roles.cache.has(moderRole.id);
                    if (roleCheck) {
                        const {mentions} = message;
                        const target = mentions.users.first();
                        if (target) {
                            const equalModRole = message.guild.members.cache.get(target.id)._roles.includes(moderRole.id);
                            const isAdmin = message.guild.members.cache.get(target.id).hasPermission('ADMINISTRATOR')
                            if (!equalModRole && !isAdmin || message.member.hasPermission('ADMINISTRATOR')) {
                                const muteRoleCheck = message.guild.members.cache.get(target.id)._roles.includes(muteRole.id);
                                if (!muteRoleCheck) {
                                    message.guild.members.cache.get(target.id).roles.add(muteRole.id);
                                    message.channel.send (`${target} was muted`);
                                } else {
                                    message.reply('That user is already muted');
                                }
                            } else {
                                message.reply('You cannot mute a member with the same moderator role as you or an Admin.');
                            }
                        } else {
                            message.reply('You need to mention a user to mute');
                        }
                    } else {
                        message.reply('You do not have the correct role to execute this command.');
                    }
                } else {
                    message.reply('It looks like the muted role needed no longer exists');
                }
            } else {
                message.reply('A Muted role has not been defined yet. Talk to the server Admin.');
            }
        } else {
            message.reply('It looks like the moderator role needed no longer exists');
        }
      } else {
            message.reply('A Moderator role has not been defined yet. Talk to the server Admin.');
      }
    } else {
        message.reply('I do not have the correct permissions to do that. Talk with the Server Admin')
    }
  }
}