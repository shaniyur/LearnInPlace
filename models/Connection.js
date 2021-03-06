
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');

const URI = require('../env').DATABASE_URI;

const connectDB = async() => {
    const conn = mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("DB connected");

    let gfs;
    const connect = mongoose.createConnection(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    connect.once('open', () => {
        gfs = Grid(connect.db, mongoose.mongo);
        gfs.collection('tutor_files');
    })
    connect.once('open', () => {
        gfs = Grid(connect.db, mongoose.mongo);
        gfs.collection('student_files');
    })
}

module.exports = connectDB;