const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }
  
  async run(client, member) {
    const memberLogFetch = await GuildConfig.findOne({guildId: member.guild.id});
    const memberLog = memberLogFetch.get('memeberLogChannel');
    const welcomeChannel = client.channels.cache.get(memberLog); 

    if (!memberLog) return;

    if (memberLog) {

      try {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(`Goodbye ${member.user.username}#${member.user.discriminator}`)
        .setTimestamp()
        .setFooter(`Brought to you by ${client.user.username}`, client.user.avatarURL())

      await welcomeChannel.send(embed);
      } catch (error) {
        if (error.code === 50013) {
          const serverOwner = member.guild.ownerID;
          client.users.fetch(serverOwner).then((serverOwner) => {
            serverOwner.send(`I tried to send a mesage in a channel to announce someone leaving your server, but I do not have the correct permissions to send that message.`);
          });
        }
      }
    }
    
  }
}