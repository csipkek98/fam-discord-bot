import cron from 'node-cron';
import * as humble from '../commands/humble.js';

export function setCronjob(client){
    console.log("Humble bundle choice cron job initiation")
    cron.schedule('0 9 1-7 * 2', async () => {
        console.log("Sending out Humble Choice alert!")
        await humble.sendChoiceAlert(client);
    }, {
        timezone: "Europe/Budapest" // Enforces strict local time mapping
    });
}