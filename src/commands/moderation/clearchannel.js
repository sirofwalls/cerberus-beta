const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ClearChannelCommand extends BaseCommand {
  constructor() {
    super('clearchannel', 'moderation', ['cc', 'clear'], 'Clears the previous messages in the channel.');
  }

  async run(client, message, args) {
      if (message.member.hasPermission('ADMINISTRATOR')) {
          message.channel.messages.fetch().then((results) => {
              message.channel.bulkDelete(results, true);
              message.channel.send('I deleted all of the messages that I could. (I cannot delete messages over 14 days old)');
          })
      } else {
        message.channel.send('You are not allwoed to use this command.')
      }
  }
}