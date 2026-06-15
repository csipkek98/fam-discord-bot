import * as humble from '../cronjobs/cron-humble.js'

export function setCronJobs(client){
    console.log("Inititing cron jobs..")

    humble.setCronjob(client)

    console.log("Cron job initiation complete!")
}