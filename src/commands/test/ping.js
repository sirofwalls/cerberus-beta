const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'testing', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    message.reply('Pong! :ping_pong:');
    message.delete({timeout: 2000});
  }
}