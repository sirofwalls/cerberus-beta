const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'help', [], 'It is a help command... it shows the commands.');
  }

  async run(client, message, args) {

    const commands = client.commands;
    const argument = args.slice().trim().split(/ +/);
    let arrayCheck = [];
    
      if (!args) {
        const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Commands List')
        .addFields([])
    
          commands.forEach(command => {
              if(command.category === 'admin' || command.category === 'owner') return;
              if(arrayCheck.includes(command.name)) return;
              arrayCheck.push(command.name);

              embed.fields.push({
                  name: `${command.name.toUpperCase()}`,
                  value: `**Category:** ${command.category}\n----------`
              });
          });

          message.channel.send(embed);
      }

      if (args) {
        const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Command description')
        .addFields([])

        commands.forEach(command => {
          if(command.category === 'admin' || command.category === 'owner') return;
          if(arrayCheck.includes(command.name)) return;
          arrayCheck.push(command.name);
          
          if (arrayCheck.includes(argument[0]) && embed.fields.length == 0) {
            embed.fields.push({
                name: `${command.name.toUpperCase()}`,
                value: `**Aliases:** ${command.aliases}\n**Category:** ${command.category.toUpperCase()}\n**Description:** ${command.description}`
            });
            arrayCheck = [];
          }
        });

        if (embed.fields.length === 0) {
          message.channel.send('That is not a command that I know or have access to.')
        } else {
          message.channel.send(embed);
        }
      }

  }
}