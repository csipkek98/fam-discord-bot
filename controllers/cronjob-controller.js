import * as humble from '../cronjobs/cron-humble.js'
import * as ytDlp from '../cronjobs/cron-yt-dlp.js'

export function setCronJobs(client){
    console.log("Initiating cron jobs..")

    humble.setCronjob(client)
    ytDlp.setCronjob(client)

    console.log("Cron job initiation complete!")
}