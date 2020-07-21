const mongoose = require("mongoose");
const Schema = mongoose.Schema
const studentSchema = new Schema({
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
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
    studentId: { type: String }

});

module.exports = mongoose.model("Student", studentSchema);