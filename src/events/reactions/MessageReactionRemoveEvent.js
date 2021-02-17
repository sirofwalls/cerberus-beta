const BaseEvent = require('../../utils/structures/BaseEvent');
const handleReaction = require('./reactionCacheCheck');

module.exports = class MessageReactionRemoveEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
  }
  
  async run(client, reaction, user) {
    handleReaction(reaction, user, false);
  }
}