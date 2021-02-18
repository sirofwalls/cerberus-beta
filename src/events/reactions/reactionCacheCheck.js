const GuildConfig = require('../../database/schemas/guildconfig');

const cache = {};

const fetchCache = (guildId) => cache[guildId] || [];

const addToCache = async (guildId, reactionMessage, emoji, roleId) => {
    const array = cache[guildId] || [reactionMessage, {}]

    if (emoji && roleId) {
        array[1][emoji] = roleId
    }

    await reactionMessage.channel.messages.fetch(reactionMessage.id, true, true)

    cache[guildId] = array
};

const handleReaction = (reaction, user, adding) => {
    const {message} = reaction;
    const {guild} = message;

    const [fetchedMessage, reactionRoles] = fetchCache(guild.id)
    if (!fetchedMessage) return;

    if (fetchedMessage.id === message.id && guild.me.hasPermission('MANAGE_ROLES')) {
        const toCompare = reaction.emoji.id || reaction.emoji.name;

        for (const key of Object.keys(reactionRoles)) {
            if (key === toCompare) {
                const role = guild.roles.cache.get(reactionRoles[key]);
                if (role) {
                    const member = guild.members.cache.get(user.id);

                    if (adding) {
                        member.roles.add(role);
                    } else {
                        member.roles.remove(role);
                    }
                }
                return;
            }
        }
    }
};


module.exports = async (client) => {
    client.on('messageReactionAdd', (reaction, user) => {
        handleReaction(reaction, user, true)
    })

    client.on('messageReactionRemove', (reaction, user) => {
        handleReaction(reaction, user, false)
    })

    const results = await GuildConfig.find();

    for (const result of results) {
        const {guildId, reactionChannel, reactionMessage, reactionRoles} = result;
        const guild = await client.guilds.cache.get(guildId);

        if (!guild) return;

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
                    const newRoles = {};

                    for (const role of roles) {
                        const {emoji, reactionRoles} = role;
                        newRoles[emoji] = reactionRoles;
                    }

                    cache[guildId] = [fetchedMessage, newRoles]
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