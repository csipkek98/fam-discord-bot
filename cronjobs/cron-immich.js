import cron from 'node-cron';
import * as immich from '../commands/immich.js';
import * as helper from '../helper.js';

// Időzítés: Minden nap 20-kor ellenőrzi
export function setCronjob(client) {

    cron.schedule('0 20 * * *', async () => {
        console.log('[Maintenance] Checking for Immich updates...');
        const config = helper.loadConfig();
        if (config.immichUpdateNotification === true) {
            await immich.checkImmichUpdates(client);
        }
    });
}

