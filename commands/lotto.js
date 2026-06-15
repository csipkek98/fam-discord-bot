export async function generateLottoNumbers(interaction){
    const lottoType = interaction.options.getString('típus');

    console.log("Generating lotto numbers for "+ lottoType + " lotto ...")

    let count = 5;
    let max = 90;
    let gameName = 'Ötös lottó';

    // Change rules dynamically if they selected Hatos lottó
    if (lottoType === 'hatos') {
        count = 6;
        max = 45;
        gameName = 'Hatos lottó';
    }

    const luckyNumbers = new Set();

    // Roll unique numbers based on the selected game rules
    while (luckyNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * max) + 1;
        luckyNumbers.add(randomNumber);
    }

    // Sort numbers numerically
    const sortedNumbers = Array.from(luckyNumbers).sort((a, b) => a - b);

    // Format and send the response
    return await interaction.reply( `🎰 **${gameName} szerencseszámok:** ${sortedNumbers.join(', ')} \nSok szerencsét! 🤞`);
}