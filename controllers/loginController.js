const fs = require('fs');
const mongoose = require('mongoose');
const Student = require('../models/student');
const Tutor = require('../models/Tutor');

//connect to database
const URI = "mongodb+srv://dbUser:summer2020@cluster0.hropv.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true }, () => {console.log("DB connected");});

function checkFormat(username, password) {
    let usernameResult = "";
    let passwordResult = "";
    if (username.length < 4) {
        usernameResult = "Username should be at least 4 characters"
    }
    if (password.length < 4) {
        passwordResult = "Password should be at least 4 characters"
    }
    console.log("usernameResult: " + usernameResult);
    console.log("passwordResult: " + passwordResult);   
    return [usernameResult, passwordResult]
}

function checkExistence(username, password) {
    console.log('endpoint - checkExistance');
    
    Student.findStudent(username, password, function (result) {
        res.status(200);
        return res.json({exist: result[0], match: result[1]});
    });


};

exports.register = function (req, res) {
    // check the request for valid data
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400);
        return res.json({
          message: "Need body params: username and password"
        })
      }

    const username = req.body.username;
    const password = req.body.password;

    let [usernameResult, passwordResult] = checkFormat(username, password);
    if (!(usernameResult === "" && passwordResult === "")) {
        res.status(200);
        return res.json( {
            validFormat: false,
            result: 'fail',
            message: 'Username or password has invalid format'
        });
    }

    // check if the user exists in the database and register into the db
    Student.findStudent(username, password, function(result) {
        if (result[0] === false && result[1] === false){
            Student.addStudent(req, function(err) {
                if (err) {
                    console.log("error occurred when calling loginController.register()");
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
