const GuildConfig = require('../../database/schemas/guildconfig');

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
                    // update the cache
                }
            } catch (err) {
                console.log(`The reaction message for ${guild.name} was not found. Deleting from the database.`);
                await GuildConfig.updateMany({guildId},{$unset: {reactionChannel, reactionMessage, reactionRoles}});
                return;
            }
        }
        
    }
}