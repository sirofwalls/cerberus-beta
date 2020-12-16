const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ClearChannelCommand extends BaseCommand {
  constructor() {
    super('clearchannel', 'testing', ['cc']);
  }

  async run(client, message, args) {
    if (message.type === 'DM') return;
      if (message.member.hasPermission('ADMINISTRATOR')) {
          message.channel.messages.fetch().then((results) => {
              message.channel.bulkDelete(results);
          })
      }
  }
}