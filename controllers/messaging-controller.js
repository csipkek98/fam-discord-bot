import * as admin from "../messaging/notifyAdmin.js";
import * as defaultChannel from "../messaging/notifyDefaultChannel.js";
import * as sender from "../messaging/notifySender.js";
import * as interaction from "../messaging/replyToInteraction.js";

export function sendMsgToAdmin(client, messageContent){
    return admin.send(client, messageContent);
}

export function sendMsgToDefChannel(client, messageContent){
    return defaultChannel.send(client, messageContent);
}

export function sendMsgToSender(target, messageContent){
    return sender.send(target, messageContent);
}

export function sendMsgToIntercation(inter, messageContent){
    return interaction.send(inter, messageContent);
}
