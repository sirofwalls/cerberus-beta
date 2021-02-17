const GuildConfig = require('../../database/schemas/guildconfig');

const cache = {};

const fetchCache = (guildId) => cache[guildId] || [];
const addToCache = (guildId, reactionMessage, emoji, roleId) => {
    const array = cache[guildId] || [mesasge, {}]

    if (emoji && roleId) {
        array[1][emoji] = roleId
    }

    cache[guildId] = array
};
const handleReaction = (reaction, user, adding) => {
    const {message} = reaction;
    const {guild} = message;

    const [fetchedMessage, reactionRoles] = fetchCache(guild.id)
    if (!fetchedMessage) return;

    if (fetchedMessage.id === mesage.id && guild.me.hasPermission('MANAGE_ROLES')) {
        const toCompare = reaction.emoji.id || reaction.emoji.name
    }
};


module.exports = async (client) => {
    const results = await GuildConfig.find();

    for (const result of results) {
        const {guildId, reactionChannel, reactionMessage, reactionRoles} = result;

        const guild = await client.guilds.cache.get(guildId);
        const channel = await guild.channels.cache.get(reactionChannel);

        if (reactionChannel) {
            if (!channel) {
                console.log(`The reactions channel for ${guild.name} was not found. Deleting from the database.`);
                await GuildConfig.updateMany({guildId},{$unset: {reactionChannel, reactionMessage, reactionRoles}});
                return;
            }
        }

        if (reactionMessage) {
            try {
                const cacheMessage = true;
                const skipCache = true;
                const fetchedMessage = await channel.messages.fetch(reactionMessage, cacheMessage, skipCache);

                if (fetchedMessage) {
                    cache[guildId] = [fetchedMessage, reactionRoles]
                }
            } catch (err) {
                console.log(`The reaction message for ${guild.name} was not found. Deleting from the database.`);
                await GuildConfig.updateMany({guildId},{$unset: {reactionChannel, reactionMessage, reactionRoles}});
            }
        }
        
    }
}

module.exports.fetchCache = fetchCache;
module.exports.addToCache = addToCache;
module.exports.handleReaction = handleReaction;