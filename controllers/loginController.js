const fs = require('fs');
const mongoose = require('mongoose');
const Student = require('../models/Student');
const Tutor = require('../models/Tutor');
const connectDB = require('../models/Connection');
const jwt = require('jsonwebtoken');
const rand = require('randomstring');
const secret = rand.generate();
Student.secret = secret;
Student.active = false;
// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandbox87f6624dab3e425a9c5f5714c82e0395.mailgun.org';
// const mg = mailgun({apiKey: '0ecc68153105e99dad062488ec42cb8a-a65173b1-a35997ea', domain: DOMAIN});
const express = require('express');
const app = express();
const sendEmail = require('../backend/sendEmail');
function checkFormat(username) {
    let usernameResult = "";
    if (username.length < 4) {
        usernameResult = "Username should be at least 4 characters"
    }
    return [usernameResult]
}

exports.registerTutor = function (req, res) {
    // check the request for valid data
    console.log("register tutor")
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
        return res.json({
            validFormat: false,
            result: 'fail',
            message: 'Username has invalid format'
        });
    }

    // check if the user exists in the database and register into the db
    Tutor.findTutor(user.tutor_email, function (result) {
        if (result[0] === false && result[1] === false) {
            Tutor.addTutor(req, function (err) {
                if (err) {
                    console.log("Error occurred when calling loginController.register()");
                } else {
                    res.json({
                        validFormat: true,
                        result: 'success',
                        message: 'New user created.'
                    });
                }
            })
        } else {
            res.status(200);
            console.log("User exists");
            return res.json({
                validFormat: true,
                result: 'fail',
                message: 'User already exists'
            });
        }
    });
}

exports.registerStudent = function (req, res) {
    console.log("Registering student");
    let user = req.body;
    // check the request for valid data
    if (user.email == undefined || user.firstName == undefined || user.lastName == undefined) {
        console.log(user.email);
        res.status(400);
        return res.json({
            message: "One or more body params are missing"
        })
    }

    let [usernameResult] = checkFormat(user.email);
    if (!(usernameResult === "")) {
        res.status(200);
        return res.json({
            validFormat: false,
            result: 'fail',
            message: 'Username or password has invalid format'
        });
    }
    const fn = user.firstName;
    const ln = user.lastName;
    const username = user.email;;

    

    // ** here
    // check if the user exists in the database and register into the db
    Student.findStudent(username, function (result) {
        if (result[0] === false && result[1] === false) {
            Student.addStudent(req, function (err) {
                if (err) {
                    console.log("Error occurred when calling loginController.register()");
                } else {
                    // const data = {
                    //     from: 'noreply@learnInPlaceteam.com',
                    //     to: username,
                    //     subject: 'Account Activation Link from LearnInPlace Team',
                    //     html: `<h2>Please click on the link below to activate your account</h2>
                    //     <p>http://localhost:8005/authentication/activate/${token}</p>
                    //     `
                    
                    // };
                    // mg.messages().send(data, function (error, body) {
                    //     if (error) {
                    //         return res.json({
                    //             message: error
                    //         })
                    //     }
                    //     else {
                    //         console.log("Sent");
                    //     }
                    // });

                    // res.json({validFormat: true,
                    //     result: 'success',
                    //     message: 'New user created.'});

                    res.redirect('/finalpage');
                }
            })
        } else {
            res.status(200);
            return res.json({
                validFormat: true,
                result: 'fail',
                message: 'User already exists: ' + user.email
            });
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