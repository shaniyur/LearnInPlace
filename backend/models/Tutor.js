const mongoose = require("mongoose");
const path = require('path');
const crypto = require('crypto');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

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
    }
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
        status: "ok"
    });
    tutor.save(function(err) {
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

module.exports = mongoose.model('tutor', tutorSchema);