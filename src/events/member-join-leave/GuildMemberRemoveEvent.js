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

      const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle(`Goodbye ${member.user.username}#${member.user.discriminator}`)
        .setTimestamp()
        .setFooter(`Brought to you by ${client.user.username}`, client.user.avatarURL())

      welcomeChannel.send(embed);
    }
    
  }
}