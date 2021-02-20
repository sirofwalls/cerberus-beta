const BaseCommand = require('../../utils/structures/BaseCommand');
const {fetchCache, addToCache} = require('../../events/reactions/reactionCacheCheck');
const GuildConfig = require('../../database/schemas/guildconfig');


module.exports = class RoleReactionCommand extends BaseCommand {
  constructor() {
    super('rolereaction', 'admin', ['rr'], 'Adds a reaction role and text to the role reaction message');
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return;

    const argument = args.slice().trim().split(/ +/);
    const {guild} = message;

    if (!guild.me.hasPermission('MANGE_MESSAGES') || !guild.me.hasPermission('MANAGE_ROLES')) {
        message.reply('I do not have the needed roles to do that. Talk with the Server owner.')
        return;
    }

    let emoji = argument.shift();
    let role = message.mentions.roles.first();
    let shiftRole = argument.shift();
    let displayName = argument.join(' ');
    
    const newRole = guild.roles.cache.find(r => {
        return r.id === role.id
    }) || null

    if (!newRole) {
        message.reply(`That role does not appear to exist on this server.`)
        return;
    }

    role = newRole;

    if (emoji.includes(':')) {
        const emojiName = emoji.split(":")[1];
        emoji = guild.emojis.cache.find(e => {
            return e.name === emojiName;
        })
    }

    const [fetchedMessage] = fetchCache(guild.id);
    const dbCheck = await GuildConfig.findOne({guildId: guild.id}, {reactionChannel: fetchedMessage.channel.id})
    if (!fetchedMessage || !dbCheck) {
        message.reply('There was an error with the reaction message. Please try again, or contact the bot owner.');
        return;
    }
    
    const newLine = `${emoji} :  \`${displayName}\``;
    let {content} = fetchedMessage;

    if (content.includes(emoji)) {
        const split = content.split('\n')

        for (let i=0; i < split.length; ++i) {
            if (split[i].includes(emoji)) {
                split[i] = newLine;
            }
        }

        content = split.join('\n');
    } else {
        content += `\n\n${newLine}\n\n`;
        fetchedMessage.react(emoji);
    }

    fetchedMessage.edit(content);

    const obj = {
        reactionChannel: fetchedMessage.channel.id,
        reactionMessage: fetchedMessage.id
    }

    await GuildConfig.findOneAndUpdate({guildId: guild.id}, {
        ...obj,
        $addToSet: {
            reactionRoles: {
                emoji,
                roleId: role.id
            }
        }
    }, {upsert:true});

    addToCache(guild.id, fetchedMessage, emoji.id, role.id)

    message.delete();
  }
}