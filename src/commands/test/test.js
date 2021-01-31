const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', [], 'Test to see if the bot is running and responding. (Admin Use only)');
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;
    message.channel.send('Test command works, my master');
  }
}