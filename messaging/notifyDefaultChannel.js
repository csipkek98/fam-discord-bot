import * as helper from "../helper.js";

export async function send(client, messageContent) {
    try {
        const config = helper.loadConfig();
        const targetChannelId = config.trackedChannelId || process.env.DISCORD_CHANNEL_ID;
        if (!targetChannelId) {
            console.warn("[Notify] Nincs beállítva alapértelmezett értesítési szoba (DISCORD_CHANNEL_ID).");
            return;
        }

        const targetChannel = await client.channels.fetch(targetChannelId).catch(() => null);

        if (targetChannel && targetChannel.isTextBased()) {
            await targetChannel.send(messageContent);
        } else {
            console.error("[Notify] Érvénytelen szoba ID vagy hiányzó jogosultságok.");
        }
    } catch (error) {
        console.error(`[Notify] Nem sikerült elküldeni az üzenetet az alapértelmezett szobába: ${error.message}`);
    }
}
