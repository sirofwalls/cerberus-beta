require('dotenv').config();
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Client();
const mongoose = require('mongoose');

mongoose.connect(process.env.DISCORD_MONGOOSE_URL, {
  useUnifiedTopology:true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

(async () => {
  client.commands = new Map();
  client.events = new Map();
  // client.prefix = process.env.DISCORD_BOT_PREFIX;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

