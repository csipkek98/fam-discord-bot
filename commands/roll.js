export async function rollTheDice(interaction){
    const rollType = interaction.options.getString('type');

    if (rollType === 'coin') {
        const outcome = Math.random() < 0.5 ? '🪙 **Fej**' : '🪙 **Írás**';
        return await interaction.reply(`${outcome}`);
    }

    if (rollType === 'd6') {
        const roll = Math.floor(Math.random() * 6) + 1;
        return await interaction.reply(`🎲 6 oldalú kocka dobás eredménye: **${roll}**`);
    }

    if (rollType === 'd20') {
        const roll = Math.floor(Math.random() * 20) + 1;
        let flavorText = '';
        if (roll === 20) flavorText = ' 🔥 (Critical Success!)';
        if (roll === 1) flavorText = ' 💀 (Critical Failure!)';
        return await interaction.reply(`🎲 20 oldalú kocka dobás eredménye: **${roll}**${flavorText}`);
    }
}