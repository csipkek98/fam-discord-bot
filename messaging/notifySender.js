export async function send(target, messageContent) {
    if (!target) {
        console.error("[Notify] A küldő (target) objektum hiányzik.");
        return;
    }

    try {
        let user = null;
        if (typeof target.send === "function") {
            user = target;
        } else if (target.user && typeof target.user.send === "function") {
            user = target.user;
        } else if (target.member && target.member.user && typeof target.member.user.send === "function") {
            user = target.member.user;
        }

        if (user) {
            await user.send(messageContent);
        } else {
            console.error("[Notify] Nem sikerült azonosítani a felhasználót a DM küldéséhez.");
        }
    } catch (error) {
        console.error(`[Notify] Nem sikerült DM-et küldeni: ${error.message}`);
    }
}
