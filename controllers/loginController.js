const Student = require('../models/Student');
const Tutor = require('../models/Tutor');

const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');

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

    Student.findStudent(username, function (result) {
        if (result[0] === false && result[1] === false) {
            Student.addStudent(req, function (err) {
                if (err) {
                    console.log("Error occurred when calling loginController.register()");
                } else {
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

exports.activateAccount=function(req,res){

const {token}=req.body;
if(token){
    jwt.verify(token,process.env.jwt,function(err,decodedToken){
        if(err){
            return res.status(400).json({error:'Incorrext token'})
        }

        const{firstName,email,lastName}=decodedToken;
        res.redirect("../redirecthome.html")
    })
}

}

exports.logout = function (req, res) {

};