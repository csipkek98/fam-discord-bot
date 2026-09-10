import * as humble from "./humble.js";

export async function humbleTest(interaction){
    const testType = interaction.options.getString("type");
    console.log("Test command fired with type: " + testType + "...")
    if (testType === "humble") {
        await humble.sendChoiceAlert(interaction.client);
    }
}
