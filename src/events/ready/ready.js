const BaseEvent = require('../../utils/structures/BaseEvent');
const reactionCache = require('../reactions/reactionCacheCheck')

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');
    client.user.setActivity('Everything', {type: 'WATCHING'});
    reactionCache(client)
  }
}