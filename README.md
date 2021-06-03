Cerberus-Beta
THE Discord bot for the Knights of Cerberus Gaming Community.

Public Commands: (ANyone can use)
Ping - Play Ping Pong with the bot
Poll - Creates a poll for users to vote on topics
Help - Displays a list of commands that can be used. Add the command name to get mroe info)
Servers - Tells the user how many people are in the server. (If the owner uses it, the bot will pm with how many users are in each server.)

Moderation Commands: (Only users with the correct role can use)
Ban - Bans a user from the server
Kick - Kicks the user from the server
Softban - Bans and then unbans the user from the server (Kicks them and deletes previous posts)
Clearchannel - clears previous posts in a channel (as many as the bot can)
Textmute - Assigns the mute role so that the user cannot talk in any text channel. (Does not set up the mute role.)
Textunmute - Removes the muted role to the user can type again. 

Admin Commands: (needs a special role to use)
Modrole - Sets the admin role needed to use admin and mod commands
Prefix - Sets the custom prefix for the server
Muterole - Assigns the role for the Textmute commands
Defaultrole - Sets the default role for any new members that join the server
Memberlogchannel - Sets the channel that the bot will announce when people join and leave the server
Setstatus - Changes the status of the bot. (Bot Owner only command)
Reactionmessage - Creates a message for adding roles from reacting to the message. (Used with rolereaction command)
Rolereaction - Adds or changes a reaction emoji and the role that it gives. 

Bot Permissions needed on deploymeent:
BAN_MEMBERS
KICK_MEMBERS
MANAGE_ROLES
MANAGE_MESSAGES
USE_EXTERNAL_EMOJIS
MANAGE_EMOJIS


Privileged Gateway Intents needed for deployment:
PRESENCE INTENT
SERVER MEMBERS INTENT

Current Invite URL:
https://discord.com/api/oauth2/authorize?client_id={CLIENT ID HERE}&permissions=1342447622&scope=bot