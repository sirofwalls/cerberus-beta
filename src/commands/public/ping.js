const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'public', [], 'Play ping-pong with the bot for basic fun.');
  }

  async run(client, message, args) {
    message.channel.send(`Pong! :ping_pong:`).then((replyMessage) => {
      replyMessage.delete({timeout: 2000})
    });
    message.delete({timeout: 2000});
  }
}