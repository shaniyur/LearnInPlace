const mongoose = require("mongoose");
const Schema = mongoose.Schema
const tutorSchema = new Schema({
    tutorId: {type: String, required: true, unique: true},
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password:{ type: String, required: true }, 
    gender: { type: String },
    followingSemesterGrade: { type: String },
    subjects: { type: String },
    experience: { type: String },
    availableHours: { type: Number },
    numberOfStudents: { type: String },
    duration: { type: String },
    reasonToTutor: { type: String },
    comments: { type: String },    
    transcript: { type: String },
    cv: { type: String },
    status: {
        type: String,
        index: true
    }
});

tutorSchema.statics.addtutor = function addtutor(reqBody, next) {
    let tutorModel = mongoose.model("tutor", tutorSchema);
    let tutor = new tutorModel({
        firstName: reqBody.body.firstName, 
        lastName: reqBody.body.lastName,
        username: reqBody.body.email,
        password: reqBody.body.password,
        email: reqBody.body.email,
        gender: reqBody.body.gender,
        followingSemesterGrade: reqBody.body.grade,
        subjects: reqBody.body.subjects,
        experience: reqBody.body.experience,
        availableHours: reqBody.body.hours,
        numberOfStudents: reqBody.body.students,
        duration: reqBody.body.duration,
        reasonToTutor: reqBody.body.reason,
        comments: reqBody.body.comments,    
        transcript: reqBody.body.transcript,
        cv: reqBody.body.cv,
        status: "ok"
    });
    tutor.save(function(err) {
        if (err) {
            console.log("error occurred when calling addUser()");
            console.log(err);
            next(err);
        } else {
            console.log("successfully add new user: " + username);
            next(null);
        }
    });
};

tutorSchema.statics.findtutor = function findtutor(username, password, next) {
    this.findOne({'username': username}, function (err, user) {
        if (err) {
            // handle error
            console.log("error occurred when calling findUser()");
            console.log(err);
        }
        console.log('findUser callback');
        if (user) {
            // check password - hashed
            next([true, match]);
        } else {
            next([false, false]);
        }
    });
};

module.exports = mongoose.model("Tutor", tutorSchema);
