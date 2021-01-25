const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'help', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    
    const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Commands List')
      .addFields([])
  
  let commands = client.commands;
  
  const arrayCheck = [];
  commands.forEach(command => {
    if(arrayCheck.includes(command.name)) return;
    arrayCheck.push(command.name);

    embed.fields.push({
        name: `${command.name}`,
        value: `Aliases: ${command.aliases}\nCategory: ${command.category}\n`
    });
  });

  console.log(embed);
  message.channel.send(embed);

  }
}