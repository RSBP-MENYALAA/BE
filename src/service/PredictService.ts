import fs from 'fs';
import path from 'path';
import {
  Prediction,
  PredictRequest,
  PredictResponse
} from '../model/PredictModel';
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import FormData from 'form-data';

export class PredictService {
  static async predict (req: PredictRequest): Promise<PredictResponse> {
    const url = process.env.ML_URL as string;
    if (!url) {
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }

    const mlHealthCheck = await axios.get(`${url}/health`);
    
    if (mlHealthCheck.status !== StatusCodes.OK) {
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }

    const filePath = req.filePath as string;

    const formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));

    const response = await axios.post(`${url}/predict`, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    if (response.status !== StatusCodes.OK) {
      console.log(response);
      throw new ResponseError(StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
    
    fs.unlinkSync(filePath);

    const data = response.data as Prediction

    const res: PredictResponse = {
      prediction: data,
    };

    return res;
  }
}
