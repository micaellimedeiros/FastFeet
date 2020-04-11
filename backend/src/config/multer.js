import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        file.key = res.toString('hex') + extname(file.originalname);
        return cb(null, file.key);
      });
    },
  }),

  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        const fileName = res.toString('hex') + extname(file.originalname);
        return cb(null, fileName);
      });
    },
  }),
};

export default {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1536 * 1536,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};
