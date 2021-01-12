const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');

module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }
  
  async run(client, member) {
    const welcomeChannel = client.channels.cache.get('522202185648308240');
    const avatarPic = member.user.avatarURL();

    if (welcomeChannel) {

      const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(`Goodbye ${member.user.username}#${member.user.discriminator}`)
        .setTimestamp()
        .setFooter(`Brought to you by ${client.user.username}`, client.user.avatarURL())

      welcomeChannel.send(embed);
    }
    
  }
}