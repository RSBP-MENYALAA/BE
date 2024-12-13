import cron from "node-cron"
import { RetrainService } from "../service/RetrainService"

cron.schedule("10 * * * * *", async () => {
    RetrainService.BatchAutomaticRetrain()
    console.log("Send Batch Image Data to Retrain...")
})