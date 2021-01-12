const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const welcomeChannel = client.channels.cache.get('522202185648308240');
    const avatarPic = member.user.avatarURL();

    if (welcomeChannel) {

      const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Welcome ${member.user.username}#${member.user.discriminator}`)
        .setDescription(`${member.user.username} has joined the server! Let's join your robot overlord in saying HELLO!`)
        .setThumbnail(avatarPic)
        .setTimestamp()
        .setFooter(`Brought to you by ${client.user.username}`, client.user.avatarURL())

      welcomeChannel.send(embed);
    }
  }
}