export async function send(client, messageContent) {
    const adminId = process.env.ADMIN_USER_ID;
    if (!adminId){
        console.log("[Notify] NO ADMIN ID SET!")
        console.log("[Notify] adminId:", adminId)
        return;
    }

    try {
        console.log("[Notify] MessageContent:", messageContent, " |")
        console.log("[Notify] Admin ID:", adminId);
        // Felhasználó lekérése (cache-ből vagy közvetlen API hívással)
        const admin = await client.users.fetch(adminId);
        console.log("[Notify] Admin:", admin.tag);

        // DM küldése
        await admin.send(messageContent);
    } catch (error) {
        console.error(`[Notify] Nem sikerült elküldeni a DM-et: ${error.message}`);
    }
}