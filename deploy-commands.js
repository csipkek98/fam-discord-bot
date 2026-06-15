require('dotenv').config();
const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

// 1. Define your slash command structures
const commands = [
    new SlashCommandBuilder()
        .setName('test')
        .setDescription('Parancs, amivel a különböző bot funkciókat lehet tesztelni')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Válassz tesztet!')
                .setRequired(true)
                .addChoices(
                    {name: 'Humble Bundle értesítés teszt', value: 'humble'}
                ))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    new SlashCommandBuilder()
        .setName('set-channel')
        .setDescription('Beállítja az alapértelmezett szobát az értesítések küldésére')
        .addChannelOption(option =>
            option.setName('target')
                .setDescription('Válassz chat szobát!')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    new SlashCommandBuilder()
        .setName('lotto')
        .setDescription('Szerencsejáték lottószám generátor')
        .addStringOption(option =>
            option.setName('típus')
                .setDescription('Válaszd ki a lottó típust')
                .setRequired(true)
                .addChoices(
                    { name: 'Ötös lottó (5/90)', value: 'otos' },
                    { name: 'Hatos lottó (6/45)', value: 'hatos' }
                )),
    new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Dobj fel egy értmét, vagy dobj egy kockával!')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Válassz mivel akarsz dobni!')
                .setRequired(true)
                .addChoices(
                    { name: 'Érme (Fej vagy Írás)', value: 'coin' },
                    { name: '6 oldalú kocka', value: 'd6' },
                    { name: '20 oldaú kocka ', value: 'd20' }
                )),
    new SlashCommandBuilder()
        .setName('exchange')
        .setDescription('Árfolyam lekérdezés különböző valutákra')
        .addStringOption(option =>
            option.setName('currency')
                .setDescription('Válassz árfolyam típust')
                .setRequired(true)
                .addChoices(
                    { name: 'EUR/HUF árfolyam', value: 'EUR' },
                    { name: 'USD/HUF árfolyam', value: 'USD' }
                )),
    new SlashCommandBuilder()
        .setName('export')
        .setDescription('Közvetlen, lejátszható videót nyer ki a közösségi média platform url-ekből')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Az url a videóhoz')
                .setRequired(true))
].map(command => command.toJSON());

// 2. Prepare the REST manager
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// 3. Push the commands to Discord's servers
(async () => {
    try {
        console.log('Refreshing slash (/) commands...');
        // Get all discord server

        var servers = process.env.DISCORD_SERVER_ID.split(",")

        console.log("Number of servers: "+ servers.length)
        for(var i = 0; i < servers.length; i++){
            await rest.put(
                Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, servers[i]),
                { body: commands },
            );
        }

        console.log('Successfully reloaded slash (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();