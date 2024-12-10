import multer, {FileFilterCallback} from 'multer'
import { Request } from 'express';
import { ResponseError } from '../error/ResponseError';
import { StatusCodes } from 'http-status-codes';

const dir = process.env.UPLOADS_PATH;

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ResponseError(StatusCodes.BAD_REQUEST, 'Invalid file type. Only JPEG, PNG, and JPG image files are allowed.'));
  }
}

export const upload = multer({
  dest: dir,
  fileFilter: fileFilter, 
});