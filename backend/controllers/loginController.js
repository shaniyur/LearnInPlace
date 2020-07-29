const fs = require('fs');
const mongoose = require('mongoose');
const Student = require('../models/Student');
const Tutor = require('../models/Tutor');
const connectDB = require('../models/Connection');

function checkFormat(username) {
    let usernameResult = "";
    // let passwordResult = "";
    if (username.length < 4) {
        usernameResult = "Username should be at least 4 characters"
    }
    // if (password.length < 4) {
    //     passwordResult = "Password should be at least 4 characters"
    // } 
    return [usernameResult]
}

exports.registerTutor = function(req, res) {
    console.log("Registering Tutor");
    // check the request for valid data
    let user = req.body;
    if (user.tutor_email == undefined || user.first_tutor_name == undefined || user.last_tutor_name == undefined) {
        console.log("Email:" + user.tutor_email);
        res.status(400);
        return res.json({
          message: "One or more body params are missing"
        })
    }

    let [usernameResult] = checkFormat(user.tutor_email);
    if (!(usernameResult === "")) {
        res.status(200);
        return res.json( {
            validFormat: false,
            result: 'fail',
            message: 'Username has invalid format'
        });
    }

    // check if the user exists in the database and register into the db
    Tutor.findTutor(user.tutor_email, function(result) {
        if (result[0] === false && result[1] === false){ 
            Tutor.addTutor(req, function(err) {
                if (err) {
                    console.log("Error occurred when calling loginController.register()");
                } else {
                    res.json({validFormat: true,
                        result: 'success',
                        message: 'New user created.'});
                }
            })
        } else {
            res.status(200);
            return res.json({validFormat:true,
                result: 'fail',
                message:'User already exists'});
        }
    });
}

exports.registerStudent = function (req, res) {
    console.log("Registering student");
    // check the request for valid data
    let user = req.body;
    if (user.email == undefined || user.firstName == undefined || user.lastName == undefined) {
        console.log(user.email);
        res.status(400);
        return res.json({
          message: "One or more body params are missing"
        })
      } 

    let [usernameResult, passwordResult] = checkFormat(user.email, user.password);
    if (!(usernameResult === "" && passwordResult === "")) {
        res.status(200);
        return res.json( {
            validFormat: false,
            result: 'fail',
            message: 'Username or password has invalid format'
        });
    }

    // check if the user exists in the database and register into the db
    Student.findStudent(user.email, function(result) {
        if (result[0] === false && result[1] === false){ 
            Student.addStudent(req, function(err) {
                if (err) {
                    console.log("Error occurred when calling loginController.register()");
                } else {
                    res.json({validFormat: true,
                        result: 'success',
                        message: 'New user created.'});
                }
            })
        } else {
            res.status(200);
            return res.json({validFormat:true,
                result: 'fail',
                message:'User already exists'});
        }
    });
};

exports.login = function (req, res) {
    // check the request for valid data

    //check if the user exists in the database

    // Login
};

exports.logout = function (req, res) {

};