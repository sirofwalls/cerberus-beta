const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SetStatusCommand extends BaseCommand {
  constructor() {
    super('setstatus', 'owner', ['ss'], 'Sets the status of the bot. Only the Bot owner can use this command.');
  }

  async run(client, message, args) {
    const ownerID = '200372249717506048';
    const parseArgs = args.slice(1).toLowerCase().trim().split('-');
    const capitalize = (arg) => {
      if (typeof arg !== 'string') return ''
      return arg.charAt(0).toUpperCase() + arg.slice(1)
    }
    const argText = capitalize(parseArgs[0]);

    if (message.member.id === ownerID) {
      client.user.setActivity(argText);
      message.delete({timeout: 1000});
      } else {
          message.author.send(`This is a command reserved for the bot owner only. \nYour message has been deleted and logged to the Bot Owner. \nRepeated attempts to use this command, or others like it will result is undesired actions`);
          message.delete({timeout: 500});
          client.users.fetch(ownerID).then((owner) => {
            owner.send(`The Set Status command has been used by ${message.author.username}#${message.author.discriminator} on the server ${message.guild.name}`);
        });
      }
  }
}