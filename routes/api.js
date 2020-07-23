const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const loginController = require('../controllers/loginController');


// route.post('/student/register', async(req, res) => {
//     console.log("Start 1");
//     const{firstName, lastName} = req.body;
//     let student = {};
//     student.firstName = firstName;
//     student.lastName = lastName;
//     let userModel = new Student(student);
//     await userModel.save();
//     res.json(userModel);
// })

route.post('/student/register', loginController.register);
// route.post('/tutor/register', loginController.register);

module.exports = route;