import * as msgCtrl from '../controllers/messaging-controller.js';
import * as helper from '../helper.js'

export async function setDefaultNotificationChannel(interaction){
    const selectedChannel = interaction.options.getChannel('target');

    console.log("Channel set initiated for target: "+selectedChannel)

    if (!selectedChannel.isTextBased()) {
        return await msgCtrl.sendMsgToIntercation(interaction, {
            content: '❌ Kérlek válassz egy létező **Chat szobát**.',
            ephemeral: true
        });
    }

    // Load, mutate state, and commit to disk
    const currentConfig = helper.loadConfig();
    currentConfig.trackedChannelId = selectedChannel.id;
    helper.saveConfig(currentConfig);

    await msgCtrl.sendMsgToIntercation(interaction, {
        content: `✅ Alapértelmezett értesítési üzenet szoba sikeresen megváltoztatva ${selectedChannel}.`
    });
}

