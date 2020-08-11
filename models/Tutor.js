const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const rand = require('randomstring');
const secret = rand.generate();
let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
let myEmail = 'learninplaceteam@gmail.com';

const tutorSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    // password:{ type: String, required: true }, 
    gender: { type: String },
    school: { type: String },
    followingSemesterGrade: { type: String },
    subjects: { type: Array },
    experience: { type: String },
    availableHours: { type: Number },
    numberOfStudents: { type: String },
    duration: { type: String },
    reasonToTutor: { type: Array },
    comments: { type: String },    
    transcript: { type: String },
    cv: { type: String },
    status: {
        type: String,
        index: true
    },
    userType: {type: String}
});

tutorSchema.statics.addTutor = function addtutor(reqBody, next) {
    let TutorModel = mongoose.model('tutor', tutorSchema);
    let username = reqBody.body.tutor_email;
    let tutor = new TutorModel({
        firstName: reqBody.body.first_tutor_name, 
        lastName: reqBody.body.last_tutor_name,
        username: username,
        // password: reqBody.body.password,
        email: username,
        gender: reqBody.body.gender,
        school: reqBody.body.tutor_school,
        followingSemesterGrade: reqBody.body.grade,
        subjects: reqBody.body.subj,
        experience: reqBody.body.tutor_exp,
        availableHours: reqBody.body.tutor_avail,
        numberOfStudents: reqBody.body.pref,
        duration: reqBody.body.duration,
        reasonToTutor: reqBody.body.motive,
        comments: reqBody.body.tutor_message,    
        // transcript: reqBody.body.transcript,
        // cv: reqBody.body.cv,
        status: "ok",
        userType: "Tutor"
    });
    tutor.save(function(err) {
        if (err) {
            console.log("error occurred when calling addTutor()");
            console.log(err);
            next(err);
        } else {
            const Tutor = mongoose.model('tutor', tutorSchema);
            Tutor.secret = secret;
            Tutor.active = false;
            const fn = reqBody.body.first_tutor_name;
            const ln = reqBody.body.last_tutor_name;
            const token = jwt.sign({ fn, ln, username }, secret, { expiresIn: '20m' });
            console.log("JWT token : " + token);
            sendVerifyEmail(username, fn, token);
            console.log("successfully add new user: " + username);
            next(null);
        }
    });
};

tutorSchema.statics.findTutor = function findtutor(username, next) {
    this.findOne({'username': username}, function (err, user) {
        if (err) {
            // handle error
            console.log("error occurred when calling findUser()");
            console.log(err);
        }        
        if (user) {
            // check password - hashed
            next([true, true]);
        } else {
            next([false, false]);
        }
    });
};

function sendVerifyEmail(username, fn, token) {
    let transport = nodemailer.createTransport(smtpTransport({
        service: "Gmail",
        host: 'smtp.gmail.com',
        auth: {
            user: myEmail,
            pass: 'Team2020'
        }
    }));

    let message = {
        from: myEmail,
        to: username,
        subject: 'Account Activation Link from LearnInPlace Team',
        html: `<h2>Hi ${fn}, <h2> <div><h4>Please click on the link below to activate your account</h4>
                        <p>http://localhost:8005/authentication/activate/${token}</p> <div>
                        `
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log("Failed to send");
            return;
        } else {
            console.log("Email sent" + info.response);
        }
    });
}

module.exports = mongoose.model('tutor', tutorSchema);