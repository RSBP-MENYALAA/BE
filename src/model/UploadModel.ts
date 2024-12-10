export interface UploadRequest {
  file: Express.Multer.File;
}

export interface UploadResponse {
  filePath: string;
}