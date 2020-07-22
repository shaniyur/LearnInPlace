const mongoose = require("mongoose");
const Schema = mongoose.Schema
const studentSchema = new Schema({
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password:{ type: String, required: true }, 
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
    studentId: { type: String },
    status: {
        type: String,
        index: true
    }
});

studentSchema.statics.addStudent = function addStudent(reqBody, next) {
    let StudentModel = mongoose.model("Student", studentSchema);
    let student = new StudentModel({
        firstName: reqBody.body.firstName, 
        lastName: reqBody.body.lastName,
        username: reqBody.body.email,
        password: reqBody.body.password,
        email: reqBody.body.email,
        gender: reqBody.body.gender,
        city: reqBody.body.city,
        state: reqBody.body.state,
        country: reqBody.body.country,
        school: reqBody.body.school,
        grade: reqBody.body.grade,
        subjects: reqBody.body.subjects,
        reasonForTutor: reqBody.body.reasonForTutor,
        duration: reqBody.body.duration,
        sessionFreq: reqBody.body.sessionFreq,
        eligibilityForFreeTutor: reqBody.body.eligibilityForFreeTutor,
        studentId: reqBody.body.studentId,
        status: "ok"
    });
    student.save(function(err) {
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

studentSchema.statics.findStudent = function findStudent(username, password, next) {
    this.findOne({'email': username}, function (err, user) {
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

module.exports = mongoose.model("Student", studentSchema);