import * as helper from '../helper.js'

export async function setDefaultNotificationChannel(interaction){
    const selectedChannel = interaction.options.getChannel('target');

    console.log("Channel set initiated for target: "+selectedChannel)

    if (!selectedChannel.isTextBased()) {
        return await interaction.reply({
            content: '❌ Kérlek válassz egy létező **Chat szobát**.',
            ephemeral: true
        });
    }

    // Load, mutate state, and commit to disk
    const currentConfig = helper.loadConfig();
    currentConfig.trackedChannelId = selectedChannel.id;
    helper.saveConfig(currentConfig);

    await interaction.reply({
        content: `✅ Alapértelmezett értesítési üzenet szoba sikeresen megváltoztatva ${selectedChannel}.`
    });
}