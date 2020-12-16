const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.author.bot) return;
    if (message.content.startsWith(client.prefix)) {
      let cmdName = message.content.split(new RegExp(/\s+/)).shift().slice(client.prefix.length).toLowerCase();
      let cmdArgs = message.content.slice(client.prefix.length + cmdName.length +1);

      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}