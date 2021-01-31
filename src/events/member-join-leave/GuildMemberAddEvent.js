const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const dbFetch = await GuildConfig.findOne({guildId: member.guild.id});
    const memberLog = dbFetch.get('memeberLogChannel');
    const defaultRoleCheck = dbFetch.get('defaultRole');
    const welcomeChannel = client.channels.cache.get(memberLog); 
    const avatarPic = member.user.avatarURL();

    if (memberLog) {

      try {
        const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Welcome ${member.user.username}#${member.user.discriminator}`)
        .setDescription(`${member.user.username} has joined the server! Let's join your robot overlord in saying HELLO!`)
        .setThumbnail(avatarPic)
        .setTimestamp()
        .setFooter(`Brought to you by ${client.user.username}`, client.user.avatarURL())

        await welcomeChannel.send(embed);
      } catch (error) {
        if (error.code === 50013) {
          const serverOwner = member.guild.ownerID;
          client.users.fetch(serverOwner).then((serverOwner) => {
            serverOwner.send(`I tried to send a mesage in a channel to announce someone joining your server, but I do not have the correct permissions to send that message.`);
          });
        }
      }
    } 

    if (defaultRoleCheck) {
      try {
        const defaultRole = member.guild.roles.cache.find(role => role.name.toLowerCase() === dbFetch.get('defaultRole').toLowerCase());
        if (defaultRole) {
          const target = client.users.cache.get(member.id);
          const defaultRoleCheck = member.guild.members.cache.get(target.id)._roles.includes(defaultRole.id);
          if (!defaultRoleCheck) {
            member.guild.members.cache.get(target.id).roles.add(defaultRole.id);
          } else return;
        } 
      } catch (error) {
          if (error.code === 50013) {
            const serverOwner = member.guild.ownerID;
            client.users.fetch(serverOwner).then((serverOwner) => {
              serverOwner.send(`I tried to give the default role to someone joining your server, but I do not have the correct permissions to do that.`);
            });
          }
        }

    } else return;


  }
}