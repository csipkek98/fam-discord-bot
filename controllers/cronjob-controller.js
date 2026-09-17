import * as humble from '../cronjobs/cron-humble.js'
import * as ytDlp from '../cronjobs/cron-yt-dlp.js'
import * as immich from '../cronjobs/cron-immich.js'

export function setCronJobs(client){
    console.log("Initiating cron jobs..")

    humble.setCronjob(client)
    ytDlp.setCronjob(client)
    immich.setCronjob(client)

    console.log("Cron job initiation complete!")
}