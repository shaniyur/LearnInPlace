const express = require('express');
const route = express.Router();
const loginController = require('../controllers/loginController');
var connectDB = require('../models/Connection');
const sendEmail = require('../backend/sendEmail')
const bodyParser = require('body-parser')
const loading = require('../backend/loadDocs');
const tutorProfileController = require('../controllers/tutorProfileController');
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
    });

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
    });

route.post('/tutor/:username/details', tutorProfileController.getTutorDetails);

module.exports = route;