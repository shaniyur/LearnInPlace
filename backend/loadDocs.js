var multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const URI = require('../env').DATABASE_URI;

const storageStudent = new GridFsStorage({
    url: URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'student_files'
            };
          resolve(fileInfo);
        });
 
    }
  });

var uploadStudent = multer({ storage: storageStudent });

const tempStorage = multer.diskStorage({
    destination: './tempfiles',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var temp = multer({ storage: tempStorage });

const storageTutor = new GridFsStorage({
    url: URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'tutor_files'
            };
            resolve(fileInfo);
        });
    }
});
var uploadTutor = multer({ storage: storageTutor });

module.exports = {temp, uploadTutor, uploadStudent};