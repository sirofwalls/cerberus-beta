# Cerberus-Beta
**THE** Discord bot for the Knights of Cerberus Gaming Community.

## Public Commands: (Anyone can use)
**Ping** - Play Ping Pong with the bot

**Poll** - Creates a poll for users to vote on topics

**Help** - Displays a list of commands that can be used. Add the command name to get mroe info)

**Servers** - Tells the user how many people are in the server. (If the owner uses it, the bot will pm with how many users are in each server.)

---

## Moderation Commands: (Only users with the correct role can use)
**Ban** - Bans a user from the server

**Kick** - Kicks the user from the server

**Softban** - Bans and then unbans the user from the server (Kicks them and deletes previous posts)

**Clearchannel** - clears previous posts in a channel (as many as the bot can)

**Textmute** - Assigns the mute role so that the user cannot talk in any text channel. (Does not set up the mute role.)

**Textunmute** - Removes the muted role to the user can type again. 

---

## Admin Commands: (needs a special role to use)
**Modrole** - Sets the admin role needed to use admin and mod commands

**Prefix** - Sets the custom prefix for the server

**Muterole** - Assigns the role for the Textmute commands

**Defaultrole** - Sets the default role for any new members that join the server

**Memberlogchannel** - Sets the channel that the bot will announce when people join and leave the server

**Setstatus** - Changes the status of the bot. (Bot Owner only command)

**Reactionmessage** - Creates a message for adding roles from reacting to the message. (Used with rolereaction command)

**Rolereaction** - Adds or changes a reaction emoji and the role that it gives. 

---

## Bot Permissions needed on deploymeent:
BAN_MEMBERS</br>
KICK_MEMBERS</br>
MANAGE_ROLES</br>
MANAGE_MESSAGES</br>
USE_EXTERNAL_EMOJIS</br>
MANAGE_EMOJIS

---

## Privileged Gateway Intents needed for deployment:
PRESENCE INTENT</br>
SERVER MEMBERS INTENT

### Current Invite URL:
https://discord.com/api/oauth2/authorize?client_id={CLIENT_ID_HERE}&permissions=1342447622&scope=

---

## How to set up the bot

Once the bot is up and running and invited to your server *(must be running before invited)* you will need to create the following roles:*(They can be named what you want)*

 - Moderator *(Does not need admin roles)*
 - Default *(Member as an example)*
 - Muted *(make this role not able to talk in any text channel or connect to voice if you want. It is a restricted or "time out" role)*

Then run the appropriate commands to set the roles with the bot *(See above)*

You can then use the "Memberlogchannel" command to set a channel that the bot will be able to announce users joining or leaving the server in *(make sure the bot can talk in that channel)*

If you want to set the prefix for the commands for your server you can use the "Prefix" command, followed by the new prefix you want *(!, !!, or ? as examples. (!!ping))*

--- 

## How to set up the Role Reactions

*This role requires the user to have the ADMINISTRATOR role and the bot to be able to talk in the channel. I recomend that only the bot be allowed to talk and add reactions to the channel. User will be able to react to the message if there are already reactions added*

In the channel you want the Role Reaction message to be in use the "rrmsg" command and optionally you can add text to personalize the message. the default text is "React to give yourself a role"

To add a reaction to the message use the command "rr" folowed by the emoji or reaction you want to use, then the mentioned role *(@example_role)*, followed by the description text you want to appear next to it. It will then add the reaction and anytime someone reacts to it, they will be added, or removed from that role if they remove their reaction to it. 

*(The roles must be lower than the bot role in the admin panel of your server/guild or the bot will throw an error)*

---

## Special Notes

- If you are developing on a M1 Mac (like I currently am) and you want to build this into a Docker container, you will need to run the build command with the flag:<pre>--platform=linux/amd64</pre>