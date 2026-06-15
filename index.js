require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const helper = require('./helper')
const cron = require('./controllers/cronjob-controller')
const cc = require('./controllers/command-controller')

// Modern architecture requires only Guilds intent for slash commands
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// START UP
client.once('clientReady', (readyClient) => {
    console.log(`Logged in successfully as ${readyClient.user.tag}`);
    console.log('------');
    helper.loadConfig()
    cron.setCronJobs(client)
    console.log("~~~~~~~~")
});

// LISTEN FOR INTERACTIONS (SLASH COMMANDS)
client.on('interactionCreate', async (interaction) => {
    // Exit if the interaction isn't an actual slash command
    if (!interaction.isChatInputCommand()) return;

    //SLASH COMMAND CONTROLLER
    await cc.handleCommand(interaction)

});

client.login(process.env.DISCORD_TOKEN);