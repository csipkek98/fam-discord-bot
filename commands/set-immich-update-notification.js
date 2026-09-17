import * as msgCtrl from '../controllers/messaging-controller.js';
import * as helper from '../helper.js'

export async function setImmichUpdateNotification(interaction){
    console.log("Immich auto update value change started")
    let needNotify = interaction.options.getBoolean("needNotify");

    // Load, mutate state, and commit to disk
    const currentConfig = helper.loadConfig();
    currentConfig.immichUpdateNotification = needNotify;
    helper.saveConfig(currentConfig);

    await msgCtrl.sendMsgToAdmin(interaction, {
        content: `✅ Immich update notification sikeresen ${needNotify ? "bekapcsolva" : "kikapcsolva"}.`
    });
}