const mongoose = require("mongoose");
const { link } = require("fs");

const tutorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
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
    calendlyLink: { type: String },
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
        status: "ok",
        userType: "Tutor"
    });
    tutor.save(function (err) {
        if (err) {
            console.log("error occurred when calling addTutor()");
            console.log(err);
            next(err);
        } else {
            console.log("successfully add new user: " + reqBody.body.tutor_email);
            next(null);
        }
    });
};

tutorSchema.statics.findTutor = function findtutor(username, next) {
    this.findOne({ 'username': username }, function (err, user) {
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

tutorSchema.statics.getCalendlyLink = function getCalendlyLink(username, next) {
    this.findOne({ 'username' : username}, { projection : { _id: 0, calendlyLink: 1}}, function(err, user) {
        if (err) {
            console.log("User not found");
            console.log(err);
        }
        if (user) {
            next([true, user]);
        } else {
            next([false, false]);
        }
    });
} 

tutorSchema.statics.getDetails = function getDetails(username, next) {
    this.findOne({ 'username' : username}, { projection : { _id: 0, firstName: 1, subjects : 1, availableHours: 1, numberOfStudents: 1 }}, function(err, user) {
        if (result[0] === true) {
            next([true, result]);
        } else {
            next([false, false]);
        }
    });
}
module.exports = mongoose.model('tutor', tutorSchema);