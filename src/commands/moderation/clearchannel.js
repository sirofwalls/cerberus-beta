const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ClearChannelCommand extends BaseCommand {
  constructor() {
    super('clearchannel', 'moderation', ['cc']);
  }

  async run(client, message, args) {
      if (message.member.hasPermission('ADMINISTRATOR')) {
          message.channel.messages.fetch().then((results) => {
              message.channel.bulkDelete(results);
          })
      }
  }
}