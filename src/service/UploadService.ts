import fs from 'fs';
import path from 'path';
import { 
  UploadRequest,
  UploadResponse 
} from '../model/UploadModel';
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';

export class UploadService {
  static async handleFileUpload(data: UploadRequest): Promise<UploadResponse> {
    if (!data.file) {
      throw new ResponseError(StatusCodes.BAD_REQUEST, 'No file uploaded');
    }

    const dir = process.env.UPLOADS_PATH as string;
    const filename = data.file.originalname;
    const filePath = path.join(dir, filename);
    fs.renameSync(data.file.path, filePath);

    const res: UploadResponse = {
      filePath: filePath,
    };

    return res;
  }
}
