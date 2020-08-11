const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const rand = require('randomstring');
const secret = rand.generate();
let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
let myEmail = 'learninplaceteam@gmail.com';

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    gender: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    school: { type: String },
    grade: { type: Number },
    subjects: { type: String },
    reasonForTutor: { type: String },
    duration: { type: String },
    sessionFreq: { type: String },
    eligibilityForFreeTutor: { type: String },
    status: {
        type: String,
        index: true
    },
    userType: {type: String}
});

studentSchema.statics.addStudent = function addStudent(reqBody, next) {
    let StudentModel = mongoose.model('student', studentSchema);
    let username = reqBody.body.email;
    let student = new StudentModel({
        firstName: reqBody.body.firstName, 
        lastName: reqBody.body.lastName,
        username: username,
        email: username,
        gender: reqBody.body.gender,
        city: reqBody.body.city,
        state: reqBody.body.state,
        country: reqBody.body.country,
        school: reqBody.body.school,
        grade: reqBody.body.grade,
        subjects: reqBody.body.subjects,
        reasonForTutor: reqBody.body.reasonForTutor,
        duration: reqBody.body.duration,
        sessionFreq: reqBody.body.session,
        eligibilityForFreeTutor: reqBody.body.eligibilityForFreeTutor,
        status: "ok",
        userType: "Student"
    });
    student.save(function(err) {
        if (err) {
            console.log("error occurred when calling addStudent()");
            console.log(err);
            next(err);
        } else {
            const Student = mongoose.model('student', studentSchema);
            Student.secret = secret;
            Student.active = false;
            const fn = reqBody.body.firstName;
            const ln = reqBody.body.lastName;
            console.log("successfully add new user: " + username);
            const token = jwt.sign({ fn, ln, username }, secret, { expiresIn: '20m' });
            console.log("JWT token : " + token);
            sendVerifyEmail(username, token);
            next(null);
        }
    });
};

studentSchema.statics.findStudent = function findStudent(username, next) {
    this.findOne({'username': username}, function (err, user) {
        if (err) {
            console.log("error occurred when calling findUser()");
            console.log(err);
        }        
        if (user) {
            next([true, true]);
        } else {
            next([false, false]);
        }
    });
};

function sendVerifyEmail(username, token) {
    // let username = req.username;
    // let token = req.token;
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
        html: `<h2>Please click on the link below to activate your account</h2>
                        <p>http://localhost:8005/authentication/activate/${token}</p>
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

module.exports = mongoose.model('student', studentSchema);