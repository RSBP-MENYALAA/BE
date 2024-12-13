import { ResponseError } from "../error/ResponseError";
import { StatusCodes } from "http-status-codes";
import { RetrainRequest, RetrainResponse } from "../model/RetrainModel";

import fs from "fs"
import axios from "axios";

export class RetrainService {
    static async retrain(req: RetrainRequest) {
        const url = process.env.ML_URL as string
        if (!url) {
            throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error")
        }

        const tempStorage = process.env.TEMP_RETRAIN_DATA_PATH

        if (!tempStorage) {
            throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error")
        }

        const data = { imagepath: req.imagepath, new_class: req.new_class }
        let retraindata = []

        if (fs.existsSync(tempStorage)) {
            const jsonData = fs.readFileSync(tempStorage);
            retraindata = JSON.parse(jsonData.toString());
        }

        retraindata.push(data)
 
        fs.writeFileSync(tempStorage, JSON.stringify(retraindata, null, 2))

        const res : RetrainResponse = {
            imagepath: req.imagepath,
            new_class: req.new_class == 0 ? "AI Generated" : "Human Generated"
        }

        return res
    }

    static async BatchAutomaticRetrain() {
        const jsonretraindatapath = process.env.TEMP_RETRAIN_DATA_PATH

        if (!jsonretraindatapath) {
            throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error")
        }

        const jsondata = JSON.parse(fs.readFileSync(jsonretraindatapath).toString())
        
        const url = process.env.ML_URL as string;
        const mlHealthCheck = await axios.get(`${url}/health`)

        if (mlHealthCheck.status !== StatusCodes.OK) {
            throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error")
        }

        await axios.post(`${url}/retrain-model`, jsondata)

        console.log("Retraining model success...")

        fs.writeFileSync(jsonretraindatapath, JSON.stringify([]))
    }

}