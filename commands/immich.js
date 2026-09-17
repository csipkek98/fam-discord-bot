import {EmbedBuilder} from "discord.js";
import * as msgCtrl from "../controllers/messaging-controller.js";
import * as helper from "../helper.js";



const IMMICH_REPO_API = 'https://api.github.com/repos/immich-app/immich/releases/latest';


export async function checkImmichUpdates(client) {
    try {
        console.log("Checking for Immich updates...");
        const config = helper.loadConfig();
        // Tároló a legutóbbi verziónak (első indításkor érdemes beállítani a jelenlegit vagy null-t)
        let lastSeenVersion = config.immichUsedVersion;

        const response = await fetch(IMMICH_REPO_API, {
            headers: {
                'User-Agent': 'DiscordBot-UpdateNotifier',
                'Accept': 'application/vnd.github+json'
            }
        });

        if (!response.ok) return;

        const data = await response.json();
        const latestVersion = data.tag_name; // pl. "v1.118.0"

        // Első futáskor csak elmentjük a verziót, hogy ne spammeljen azonnal
        console.log("Latest version: "+latestVersion)
        if (!lastSeenVersion) {
            config.immichUsedVersion = latestVersion;
            helper.saveConfig(config);
            return;
        }

        // Ha új verzió jelent meg
        console.log("Current version on github: "+lastSeenVersion)
        if (latestVersion !== lastSeenVersion) {
            config.immichUsedVersion = latestVersion;
            helper.saveConfig(config);
            console.log("Version is updated! Sending notification to admin...")

            const embed = new EmbedBuilder()
                .setTitle(`🚀 Új Immich frissítés érhető el: ${latestVersion}`)
                .setURL(data.html_url)
                .setDescription(
                    data.body.length > 300
                        ? data.body.substring(0, 300) + '...\n\n*(Olvasd el a breaking change-eket a linken!)*'
                        : data.body
                )
                .setColor(0x4285F4)
                .setTimestamp(new Date(data.published_at));

            await msgCtrl.sendMsgToAdmin(client.client, { embeds: [embed] })
        }
    } catch (error) {
        console.error('Hiba az Immich frissítések ellenőrzésekor:', error);
    }
}
