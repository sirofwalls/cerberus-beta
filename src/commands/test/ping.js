const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'testing', ['paddle', 'pingpong']);
  }

  async run(client, message, args) {
<<<<<<< HEAD
    if (message.type === 'DM' || (!message.member.hasPermission('ADMINISTRATOR'))) return;
    message.reply('Pong! :ping_pong:').then((replyMessage) => {
      replyMessage.delete({timeout: 2000})
    });
=======
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    message.reply('Pong! :ping_pong:');
>>>>>>> mod-roles
    message.delete({timeout: 2000});
  }
}