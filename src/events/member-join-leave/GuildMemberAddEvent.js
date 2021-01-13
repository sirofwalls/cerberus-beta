const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    const memberLogFetch = await GuildConfig.findOne({guildId: member.guild.id});
    const memberLog = memberLogFetch.get('memeberLogChannel');
    const welcomeChannel = client.channels.cache.get(memberLog); 
    const avatarPic = member.user.avatarURL();

    if (!memberLog) return;

    if (memberLog) {

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