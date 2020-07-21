const fs = require('fs');
const mongoose = require('mongoose');
const Student = require('../models/student');
const Tutor = require('../models/Tutor');

//connect to database
const URI = "mongodb+srv://dbUser:summer2020@cluster0.hropv.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true }, () => {console.log("DB connected");});

function checkBasicFormat(username, password) {
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

function checkFormat(username, password) {
    console.log('endpoint - checkFormat');

    let [usernameResult, passwordResult] = checkBasicFormat(username, password);
    res.status(200);
    return res.json({
        isUsernameValid: (usernameResult === ""),
        isPasswordValid: (passwordResult === ""),
        usernameFormatError: usernameResult,
        passwordFormatError: passwordResult
    });
};

function checkExistence(username, password) {
    console.log('endpoint - checkExistance');
    
    const studentFromDb = await Student.findOne({ email: username }).exec();



};

exports.register = function (req, res) {
    // check the request for valid data
    checkFormat(req.query.username, req.query.password);
    //check if the user exists in the database

    // register user to the db
};

exports.login = function (req, res) {
    // check the request for valid data

    //check if the user exists in the database

    // Login
};

exports.logout = function (req, res) {

};
