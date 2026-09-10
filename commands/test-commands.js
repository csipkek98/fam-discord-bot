import * as humble from "./humble.js";
import * as messagingController from "../controllers/messaging-controller.js";

export async function humbleTest(interaction){
    const testType = interaction.options.getString("type");
    console.log("Test command fired with type: " + testType + "...")

    try {
        if (testType === "humble") {
            await humble.sendChoiceAlert(interaction.client);
            await messagingController.sendMsgToIntercation(interaction, {
                content: "✅ Humble Choice értesítés sikeresen kiküldve!",
                ephemeral: true
            });
        } 
        else if (testType === "admin") {
            await messagingController.sendMsgToAdmin(interaction.client, "👑 Ez egy teszt üzenet a bot adminisztrátorának!");
            await messagingController.sendMsgToIntercation(interaction, {
                content: "✅ Teszt DM sikeresen elküldve az adminnak!",
                ephemeral: true
            });
        } 
        else if (testType === "defaultChannel") {
            await messagingController.sendMsgToDefChannel(interaction.client, "📢 Ez egy teszt üzenet az alapértelmezett értesítési csatornába!");
            await messagingController.sendMsgToIntercation(interaction, {
                content: "✅ Teszt üzenet sikeresen elküldve az alapértelmezett csatornába!",
                ephemeral: true
            });
        } 
        else if (testType === "sender") {
            await messagingController.sendMsgToSender(interaction, "✉️ Szia! Ez egy teszt DM üzenet neked, mivel te indítottad a parancsot.");
            await messagingController.sendMsgToIntercation(interaction, {
                content: "✅ Teszt DM sikeresen elküldve neked!",
                ephemeral: true
            });
        } 
        else if (testType === "interaction") {
            await messagingController.sendMsgToIntercation(interaction, {
                content: "⚡ Ez egy teszt válasz közvetlenül erre az interakcióra!",
                ephemeral: true
            });
        }
    } catch (error) {
        console.error(`[Test] Hiba történt a(z) "${testType}" teszt futtatása közben:`, error);
        await messagingController.sendMsgToIntercation(interaction, {
            content: `❌ Hiba történt a teszt futtatása közben: ${error.message}`,
            ephemeral: true
        }).catch(() => null);
    }
}
