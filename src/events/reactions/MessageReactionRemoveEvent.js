const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class MessageReactionRemoveEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
  }
  
  async run(client, reaction, user) {
    
  }
}