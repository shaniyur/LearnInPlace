const mongoose = require("mongoose");
const path = require('path');
const crypto = require('crypto');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const { Decimal128 } = require("mongodb");

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
    userType: { type: String }
});

// var connectDB = require('./models/Connection');

// Mongo connection
const URI = "mongodb+srv://dbUser:summer2020@cluster0.hropv.mongodb.net/test?retryWrites=true&w=majority";

// // Create mongo connection
// const conn = mongoose.createConnection(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// // Init gfs
// let gfs;

// conn.once('open', () => {
//     // Init stream
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('transcripts');
// });

// connectDB();

// Create storage engine
// const storage = new GridFsStorage({
//     url: URI,
//     file: (req, file) => {
//     console.log("process 1");

//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) { 
//             return reject(err);
//           }
//   console.log("process 2");

//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'transcripts'
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   });
// const upload = multer({ storage });

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
            console.log("successfully add new user: " + reqBody.body.tutor_email);
            // const storage = new GridFsStorage({
            //     url: URI,
            //     file: (req, file) => {
            //     console.log("process 1");

            //       return new Promise((resolve, reject) => {


            //         console.log("process 2");

            //           const filename = "hello";
            //           const fileInfo = {
            //             filename: filename,
            //             bucketName: 'transcripts'
            //           };
            //           resolve(fileInfo);

            //       });
            //     }
            //   });
            // const upload = multer({ storage: storage });
            // upload.single('tutor_trans');
            // upload.single(reqBody.body.tutor_trans)
            next(null);
        }
    });
};

tutorSchema.statics.findTutor = function findtutor(username, next) {
    this.findOne({ 'username': username }, function(err, user) {
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