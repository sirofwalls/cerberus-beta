const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PollCommand extends BaseCommand {
  constructor() {
    super('poll', 'public', [], 'Create a poll so people can react to the different options. \n Different options need to be inside quotation marks ("")\nAn example is <prefix>poll "Poll Title" "option 1" "option 2" "option 3"');
  }

  async run(client, message, args) {
    const capitalize = (arg) => {
      if (typeof arg !== 'string') return ''
      return arg.charAt(0).toUpperCase() + arg.slice(1)
    }
    const regex = args.slice().match(/"[^"]+"|[\\S]+"[^"]+/g);
    const emojis = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
    const pollTitle = capitalize(regex[0].substr(1).slice(0, -1));
    const pollOptions = regex.slice(1)

    let str = '';
    let i = 0;

    if (!pollOptions) {
        message.reply('You must have something to poll... right?')
        message.delete();
        return;
    }
    if (pollOptions.length >= 10) {
        message.reply('You can have a maximum of 9 Poll options.')
        message.delete();
        return;
    }

    for (const poll of pollOptions) {
        str = str + `${emojis[i]} ${poll}\n\n`
        i++;
    }

    const pollEmbed = new Discord.MessageEmbed()
      .setTitle(`${pollTitle}`)
      .setColor('GREEN')
      .setDescription(str.replace(/"/g, ''))
      .addFields([])

    const msg = await message.channel.send(pollEmbed);

    for (let i = 0; i < pollOptions.length; i++) {
        msg.react(emojis[i]);
    }

    message.delete();
  }
}