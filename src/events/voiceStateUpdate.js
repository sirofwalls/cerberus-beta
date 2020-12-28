const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class WoiceStateUpdateEvent extends BaseEvent {
  constructor() {
    super('voiceStateUpdate');
  }
  
  async run(client, oldState, newState) {
    const channelName = 'Private Meetings';

    const getVoiceChannels = (guild) => {
      return guild.channels.cache.filter((channel) => {
        return channel.type === 'voice' && channel.name === channelName;
      })
    }
    const {guild} = oldState;
    const joined = !!newState.channelID;
    const channelId = joined ? newState.channelID : oldState.channelID;
    const channel = guild.channels.cache.get(channelId);

    if (channel.name === channelName) {
      if (joined) {
        const channels = getVoiceChannels(guild);

        let hasEmpty = false;

        channels.forEach((channel) => {
          if (!hasEmpty && channel.members.size === 0) {
            hasEmpty = true;
          }
        })

        if (!hasEmpty) {
          const {
            type,
            userLimit,
            bitrate,
            parentID,
            rawPosition
          } = channel;

          guild.channels.create(channelName, {
            type,
            userLimit,
            bitrate,
            parent: parentID,
            position: rawPosition,
            userLimit: 0,
          })
        }
      } else if (channel.members.size === 0 && getVoiceChannels(guild).size > 1) {
        channel.delete();
      }
    }
  }
}