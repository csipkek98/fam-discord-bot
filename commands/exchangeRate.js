export async function getExchangeRate(interaction){
    const baseCurrency = interaction.options.getString('currency');

    // Acknowledge the interaction instantly so it doesn't time out while fetching data
    await interaction.deferReply();

    try {
        console.log("Gathering exchange rate data for "+ baseCurrency + "...")
        // Using a reliable open currency API
        const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`);
        const data = await response.json();

        if (data.result === 'success') {
            const hufRate = data.rates.HUF.toFixed(2);
            const lastUpdate = data.time_last_update_utc.substring(0, 16);

            await interaction.editReply(
                `💱 **Jelenlegi árfolyam:**\n` +
                `• **1 ${baseCurrency}** = **${hufRate} HUF**\n` +
                `*Utolsó frissítés időpontja: ${lastUpdate} UTC*`
            );
        } else {
            await interaction.editReply('❌ API lekérdezés sikertelen.');
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply('❌ Hiba történt a lekérdezés közben.');
    }
}