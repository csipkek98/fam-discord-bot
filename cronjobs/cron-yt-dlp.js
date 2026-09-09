import cron from 'node-cron';
import { exec } from 'node:child_process';

export function setCronjob(client){
    console.log("yt-dlp updater cron job initiation")
    // Minden nap hajnali 4:00-kor lefut:
    cron.schedule('0 4 * * *', () => {
        console.log('[Maintenance] Checking for yt-dlp updates...');
        updateYtDlp()
    });
}

export function updateYtDlp() {
    exec('yt-dlp -U', (error, stdout, stderr) => {
        console.log('[Maintenance] Start yt-dlp update...');
        if (error) {
            console.error(`[Maintenance] yt-dlp update failed: ${error.message}`);
            return;
        }
        if (stderr) {
            console.warn(`[Maintenance] yt-dlp update warning: ${stderr}`);
        }
        console.log(`[Maintenance] yt-dlp update output:\n${stdout.trim()}`);
    })
}