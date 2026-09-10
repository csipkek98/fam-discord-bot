import {EmbedBuilder} from "discord.js";
import * as msgCtrl from "../controllers/messaging-controller.js";

export async function sendChoiceAlert(client) {
    try {
        console.log("Triggering automated Humble Choice alert...");
        const currentMonthName = new Date().toLocaleString("hu-HU", { month: "long" });

        const choiceEmbed = new EmbedBuilder()
            .setColor("#007BFF")
            .setTitle("🎮 Új Humble Choice elérhető!")
            .setDescription(`**${currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1)} havi Humble**\n\nKattints a fenti kékkel jelölt linkre és váltsd be a Steam-kulcsaidat!`)
            .setURL("https://www.humblebundle.com/membership")
            .setTimestamp()
            .setFooter({ text: "Humble Choice Scheduled Notification Service" });

        await msgCtrl.sendMsgToDefChannel(client, { embeds: [choiceEmbed] });
        console.log("Humble Choice notification cleanly dispatched.");
    } catch (error) {
        console.error("Error executing scheduled alert:", error);
    }
}
