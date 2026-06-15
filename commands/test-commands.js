import * as humble from './humble.js'; // Fixed: Added relative path './'

export async function humbleTest(interaction){
    console.log("Test command fired with type: "+ testType + "...")
    const testType = interaction.options.getString('type');
    if (testType === 'humble') {
        await humble.sendChoiceAlert(interaction.client);
    }
}
