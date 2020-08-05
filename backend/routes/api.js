const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const loginController = require('../controllers/loginController');

const bodyParser = require('body-parser')
// parse application/json
route.use(bodyParser())

// route.post('/student/register', loginController.registerStudent);
route.post('/tutor/register', loginController.registerTutor);

module.exports = route;