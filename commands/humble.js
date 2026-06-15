import * as helper from '../helper.js'
import {EmbedBuilder} from "discord.js";

export async function sendChoiceAlert(client) {
    try {
        console.log('Triggering automated Humble Choice alert...');
        const config = helper.loadConfig();
        const targetChannelId = config.trackedChannelId || process.env.DISCORD_CHANNEL_ID;
        const targetChannel = await client.channels.fetch(targetChannelId).catch(() => null);

        if (targetChannel && targetChannel.isTextBased()) {
            const currentMonthName = new Date().toLocaleString('hu-HU', { month: 'long' });

            const choiceEmbed = new EmbedBuilder()
                .setColor('#007BFF')
                .setTitle(`🎮 Új Humble Choice elérhető!`)
                .setDescription(`**${currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1)} havi Humble**\n\nKattints a fenti kékkel jelölt linkre és váltsd be a Steam-kulcsaidat!`)
                .setURL('https://www.humblebundle.com/membership')
                .setTimestamp()
                .setFooter({ text: 'Humble Choice Scheduled Notification Service' });

            await targetChannel.send({ embeds: [choiceEmbed] });
            console.log('Humble Choice notification cleanly dispatched.');
        } else {
            console.error('⚠️ Could not send alert: Invalid channel ID or missing permissions.');
        }
    } catch (error) {
        console.error('Error executing scheduled alert:', error);
    }
}