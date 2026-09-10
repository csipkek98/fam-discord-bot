export async function send(interaction, messageContent) {
    if (!interaction) {
        console.error("[Notify] Az interaction objektum hiányzik.");
        return;
    }

    try {
        if (interaction.replied) {
            await interaction.followUp(messageContent);
        } else if (interaction.deferred) {
            await interaction.editReply(messageContent);
        } else {
            await interaction.reply(messageContent);
        }
    } catch (error) {
        console.error(`[Notify] Nem sikerült válaszolni az interakcióra: ${error.message}`);
    }
}
