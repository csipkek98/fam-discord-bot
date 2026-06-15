import * as humble from './humble.js'; // Fixed: Added relative path './'

export async function humbleTest(interaction){
    const testType = interaction.options.getString('type');
    if (testType === 'humble') {
        await humble.sendChoiceAlert(interaction.client);
    }
}
