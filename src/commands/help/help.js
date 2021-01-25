const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'help', [], 'It is a help command... it shows the commands.');
  }

  async run(client, message, args) {    
    const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('Commands List')
      .addFields([])
  
  let commands = client.commands;
  
  const arrayCheck = [];
  commands.forEach(command => {
      if(command.category === 'admin' || command.category === 'owner') return;
    if(arrayCheck.includes(command.name)) return;
    arrayCheck.push(command.name);

    embed.fields.push({
        name: `${command.name.toUpperCase()}`,
        value: `**Aliases:** ${command.aliases}\n**Category:** ${command.category.toUpperCase()}\n**Description:** ${command.description}\n----------`
    });
  });

  message.channel.send(embed);

  }
}