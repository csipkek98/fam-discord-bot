export async function send(client, messageContent) {
    const adminId = process.env.ADMIN_USER_ID;
    if (!adminId) return;

    try {
        // Felhasználó lekérése (cache-ből vagy közvetlen API hívással)
        const admin = await client.users.fetch(adminId);

        // DM küldése
        await admin.send(messageContent);
    } catch (error) {
        console.error(`[Notify] Nem sikerült elküldeni a DM-et: ${error.message}`);
    }
}