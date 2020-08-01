const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
var multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const sendEmail = require('../backend/sendEmail');
const apiRouter = require('./routes/api');
var connectDB = require('./models/Connection');

connectDB();

app.use(express.json({ extended: false }));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser());
app.use(methodOverride('_method'));
//app.use(multer)
app.set('view engine', 'ejs');

app.use('/api', apiRouter);

app.use(bodyParser());

// on server this will be http://localhost:post/cssFiles
app.use('/cssFiles', express.static(path.join(__dirname + '../../testhomepg/testhomepg/')));
app.use(express.static('./studentsignup'))

const URI = "mongodb+srv://dbUser:summer2020@cluster0.hropv.mongodb.net/test?retryWrites=true&w=majority";

const storage = new GridFsStorage({
    url: URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'tutor_files'
            };
            resolve(fileInfo);
        });
    }
});
var upload = multer({ storage: storage });

const tempStorage = multer.diskStorage({
    destination: 'C:/Users/vaish/Downloads/Prak/LA/LearnInPlace/backend/tempfiles',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var temp = multer({ storage: tempStorage });

app.get('/', function (req, resp) {
    resp.sendFile('home.html', { root: path.join(__dirname, '../testhomepg/testhomepg/') });
})

app.get('/tutorsignups', function (req, resp) {
    console.log("tutor signup form works!")
    resp.sendFile('tutorsignups.html', { root: path.join(__dirname, '../') });
})

app.get('/studentsignups', function (req, resp) {
    console.log("student signup form works!")
    resp.sendFile('studentsignups.html', { root: path.join(__dirname, '../studentsignup') });
})

app.get('/renderform.js', function (req, resp) {
    console.log('render form sent')
    resp.sendFile('renderform.js', { root: path.join(__dirname, '../') })
})


app.post('/tutorfiles',
    upload.fields([{
        name: 'transcript', maxCount: 1
    }, {
        name: 'cv', maxCount: 1
    }]),
    function (req, res) {
        // console.log(req.body);
        // console.log(req.files);
        // console.log('Data:' + JSON.stringify(req.body));
        if (req.fileValidationError) {
            res.send(req.fileValidationError);
        }
        else {
            res.send('success');
        }
    })

app.post('/tutorfileslocal',
    temp.fields([{
        name: 'transcript', maxCount: 1
    }, {
        name: 'cv', maxCount: 1
    }]),
    function (req, res) {
        // console.log(req.body);
        // console.log(req.files);
        // console.log('Data:' + JSON.stringify(req.body));
        if (req.fileValidationError) {
            res.send(req.fileValidationError);
        }
        else {
            res.send('success');
        }
})

app.get('/tutorthankyou', function (req, resp) {
    console.log("tutor thankyou sent")
    resp.sendFile('tutorthankyou.html', { root: './' });
})

app.post('/sendEmail', sendEmail.sendFiles); 

const port = process.env.PORT || '3000';
app.listen(port, () => console.log("server started: " + port))
