const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const loginController = require('../controllers/loginController');
// var path = require('path');
// var bodyParser = require('body-parser');

// // route.post('/student/register', async(req, res) => {
// //     console.log("Start 1");
// //     const{firstName, lastName} = req.body;
// //     let student = {};
// //     student.firstName = firstName;
// //     student.lastName = lastName;
// //     let userModel = new Student(student);
// //     await userModel.save();
// //     res.json(userModel);
// // })

// route.use(bodyParser());
// // on server this will be http://localhost:post/cssFiles
// route.use('/cssFiles',express.static(path.join(__dirname + '../../../testhomepg/testhomepg/')));
// //app.use('/images',express.static(__dirname + '/studentsignup/'));
// //\Users\topaz\Documents\learningalliance\backend\routes
// route.get('/', function(req, resp) {
//     //console.log(__dirname)
//     resp.sendFile('home.html', {root:path.join(__dirname, '../../testhomepg/testhomepg/')});
//     //resp.send("this works");
// })

// route.get('/tutorsignups', function(req,resp) {
//     console.log("sup bitch")
//     resp.sendFile('tutorsignups.html', {root:path.join(__dirname, '../../')});
// })

// route.get('/studentsignups', function(req,resp) {
//     console.log("sup bitch 2")
//     resp.sendFile('studentsignups.html', {root:path.join(__dirname, '../../studentsignup')});
// })

// route.get('/renderform.js', function(req, resp) {
//     console.log('render form sent')
//     resp.sendFile('renderform.js', {root:path.join(__dirname, '../../')})
// })

// // app.post('/tutorsubmit', function(req, resp) {
// //     console.log('Data:' + JSON.stringify(req.body));
// //     resp.json({message: 'tutor message recieved!!!'})
// //     //resp.send('hsahsaj')
// //     //resp.redirect('/tutor/register');
// //     // this is the header issue
// //     //resp.sendFile('tutorthankyou.html', {root:path.join(__dirname)})
// // })

// route.get('/tutorthankyou.html', function(req, resp) {
//     console.log("tutor thankyou sent")
//     resp.sendFile('tutorthankyou.html', {root:path.join(__dirname, '../../')})
// })


route.post('/student/register', loginController.registerStudent);
route.post('/tutor/register', loginController.registerTutor);

module.exports = route;