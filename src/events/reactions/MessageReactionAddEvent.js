const BaseEvent = require('../../utils/structures/BaseEvent');
const handleReaction = require('./reactionCacheCheck');

module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  
  async run(client, reaction, user) {
    handleReaction(reaction, user, true);
  }
}