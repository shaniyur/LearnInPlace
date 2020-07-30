const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const loginController = require('../controllers/loginController');

var bodyParser = require('body-parser')
// parse application/json
route.use(bodyParser());

// route.post('/', function(req,resp) {
//     console.log(JSON.stringify(req.body));
// })

route.post('/student/register', loginController.registerStudent);
route.post('/tutor/register', loginController.registerTutor);

module.exports = route;