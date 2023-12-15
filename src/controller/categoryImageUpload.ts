import { Request, Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';
import { RequestHandler } from 'express-serve-static-core';


const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: null | Error, destination: string) => void) => {
    cb(null, 'public/uploads');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: null | Error, filename: string) => void) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
  const fileTypes = /jpg|png/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));

  if (mimeType && extname) {
    cb(null, true);
  } else {
    cb(new Error('Give proper file format to upload'), false);
  }
};

const limits = { fileSize: 1000000 };

const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter,
}).single('profileImage');

export default upload;
