const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const s3 = require('../../helpers/s3');

async function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|xlsx|csv|pdf|docx/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = (path.extname(file.originalname).toLowerCase() === '.xlsx') ? true : fileTypes.test(file.mimetype);

  if (mimeType && extname) {
    return cb(null, true);
  }
  return cb('Error: Images and excel file only!');
}

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, `${uuidv4()}${path.extname(file.originalname).toLowerCase()}`);
    },
  }),
  limits: { fileSize: 10000000 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
