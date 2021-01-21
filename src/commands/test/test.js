const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    if (message.type === 'DM' || (!message.member.hasPermission('ADMINISTRATOR'))) return;
    message.channel.send('Test command works, my master').then((replyMessage) => {
      replyMessage.delete({timeout: 2000})
    });
    message.delete({timeout: 2000})
  }
}