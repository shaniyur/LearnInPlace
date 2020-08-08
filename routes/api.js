const express = require('express');
const route = express.Router();
const loginController = require('../controllers/loginController');
var connectDB = require('../models/Connection');
var multer = require('multer');
const sendEmail = require('../backend/sendEmail')
const bodyParser = require('body-parser')
const GridFsStorage = require('multer-gridfs-storage');
const loading = require('../backend/loadDocs');
route.use(bodyParser())


connectDB();

route.post('/sendEmail', sendEmail.sendFiles);

route.post('/tutor/register', loginController.registerTutor);

route.post('/student/register', loading.uploadStudent.single('prodImage'), loginController.registerStudent);


route.post('/tutorfiles',
    loading.uploadTutor.fields([{
        name: 'transcript', maxCount: 1
    }, {
        name: 'cv', maxCount: 1
    }]),
    function (req, res) {
        if (req.fileValidationError) {
            res.send(req.fileValidationError);
        }
        else {
            res.send('success');
        }
    })


route.post('/tutorfileslocal',
    loading.temp.fields([{
        name: 'transcript', maxCount: 1
    }, {
        name: 'cv', maxCount: 1
    }]),
    function (req, res) {
        if (req.fileValidationError) {
            res.send(req.fileValidationError);
        }
        else {
            res.send('success');
        }
    })

module.exports = route;