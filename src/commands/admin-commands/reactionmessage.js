const BaseCommand = require('../../utils/structures/BaseCommand');
const GuildConfig = require('../../database/schemas/guildconfig');

module.exports = class ReactMessageCommand extends BaseCommand {
  constructor() {
    super('reactmessage', 'admin', ['rrmsg'], 'Creates a message to add reactions and get roles.');
  }

  async run(client, message, args) {

    const argument = args.slice().trim().split(/ +/);
    const {guild, mentions} = message;
    const {channels} = mentions;
    const targetChannel = channels.first() || message.channel;

    if (!guild.me.hasPermission('MANGE_MESSAGES') || !guild.me.hasPermission('MANAGE_ROLES')) {
        message.reply('I do not have the needed roles to do that. Talk with the Server owner.')
        return;
    }

    if (channels.first()) {
        argument.shift()
    }

    const text = argument.join(' ');
    const newMessage = await targetChannel.send('Setting up');

    const reactionData = await GuildConfig.updateMany({guildId:guild.id}, {reactionChannel: targetChannel.id, reactionMessage:newMessage.id})
    .catch((err) => {
        message.channel.send("There was an error saving this informaiton to the database. Please report this to the bot owner.").then((replyMessage) => {
            replyMessage.delete({timeout:1000 * 10})
            message.delete();
        });
        console.log(err);
    });

    if(reactionData) {
        message.delete();
        newMessage.edit(text);
    }
  }
}