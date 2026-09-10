import * as humble from "./humble.js";
import * as messagingController from "../controllers/messaging-controller.js";

export async function humbleTest(interaction){
    const testType = interaction.options.getString("type");
    console.log("Test command fired with type: " + testType + "...")
    if (testType === "humble") {
        await humble.sendChoiceAlert(interaction.client);
        await messagingController.sendMsgToAdmin(interaction, {
            content: "✅ Humble Choice értesítés sikeresen kiküldve!",
            ephemeral: true
        });
    }
}
