const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'testing', ['paddle', 'pingpong']);
  }

  async run(client, message, args) {
    if (message.type === 'DM') return;
    message.reply('Pong! :ping_pong:');
    message.delete({timeout: 2000});
  }
}