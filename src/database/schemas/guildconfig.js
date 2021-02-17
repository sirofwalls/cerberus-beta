const mongoose = require('mongoose');

const GuildConfigSchema = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    guildName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: '!',
    },
    defaultRole: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    moderatorRole: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    announceRole: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    memeberLogChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    mutedRole: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    reactionChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    reactionMessage: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    reactionRoles: [{
        emoji: {
            type: mongoose.SchemaTypes.String,
            required: false,
        },
        roleId: {
            type: mongoose.SchemaTypes.String,
            required: false,
        },
    }]
});

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);