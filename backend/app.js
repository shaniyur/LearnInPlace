const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
var multer = require('multer');

const apiRouter = require('./routes/api');
var connectDB = require('./models/Connection');

connectDB();

app.use(express.json({ extended: false}));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser());
app.use(methodOverride('_method'));
//app.use(multer)
app.set('view engine', 'ejs');

app.use('/api', apiRouter);

var path = require('path');

app.use(bodyParser());


// on server this will be http://localhost:post/cssFiles
app.use('/cssFiles',express.static(path.join(__dirname + '../../testhomepg/testhomepg/')));
app.use(express.static('./studentsignup'))
//app.use('/images',express.static(__dirname + '/studentsignup/'));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'/uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  });
   
var upload = multer({storage: storage});

app.get('/', function(req, resp) {
    //console.log(__dirname)
    resp.sendFile('home.html', {root:path.join(__dirname, '../testhomepg/testhomepg/')});
    //resp.send("this works");
})

app.get('/tutorsignups', function(req,resp) {
    //console.log('Data:' + JSON.stringify(req.body));
    console.log("tutor signup form works!")
    resp.sendFile('tutorsignups.html', {root:path.join(__dirname, '../')});
})

app.get('/studentsignups', function(req,resp) {
    console.log("student signup form works!")
    resp.sendFile('studentsignups.html', {root:path.join(__dirname, '../studentsignup')});
})

app.get('/renderform.js', function(req, resp) {
    console.log('render form sent')
    resp.sendFile('renderform.js', {root:path.join(__dirname, '../')})
})

//testing route
app.post('/tutorsubmit',  upload.array('files', 2), function(req, res) {
    console.log(req.body);
    console.log(req.files)
    console.log('Data:' + JSON.stringify(req.body));

    //let upload = multer({ storage: storage}).single('transcript');

    // upload(req, res, function(err) {
    //     // req.file contains information of uploaded file
    //     // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            res.send(req.fileValidationError);
        }
        else if (!req.file) {
            res.send('Please select an image to upload');
        }
        else {
            res.send('this shit works!!!');
        }
    // })

    console.log('File print out' + req.files)
    //resp.redirect('/api/tutor/register');
    //res.json({message: 'tutor message recieved!!!'})
    //resp.send('hsahsaj')
    // this is the header issue
    //resp.sendFile('tutorthankyou.html', {root:path.join(__dirname)})
})

// app.post('/tutorsubmit',  upload.single('transcript'), function(req, res) {
//     console.log(req.body);
//     console.log(req.files)
//     console.log(req.body.tutor_trans)
//     console.log('Data:' + JSON.stringify(req.body));

//     //let upload = multer({ storage: storage}).single('transcript');

//     // upload(req, res, function(err) {
//     //     // req.file contains information of uploaded file
//     //     // req.body contains information of text fields, if there were any

//         if (req.fileValidationError) {
//             res.send(req.fileValidationError);
//         }
//         else if (!req.file) {
//             res.send('Please select an image to upload');
//         }
//         else {
//             res.send('this shit works!!!');
//         }
//     // })

//     console.log(req.files)
//     //resp.redirect('/api/tutor/register');
//     //res.json({message: 'tutor message recieved!!!'})
//     //resp.send('hsahsaj')
//     // this is the header issue
//     //resp.sendFile('tutorthankyou.html', {root:path.join(__dirname)})
// })

app.get('/tutorthankyou', function(req, resp) {
    console.log("tutor thankyou sent")
    //resp.sendFile('tutorthankyou.html', {root:path.join(__dirname, '../')})
    resp.sendFile('tutorthankyou.html', { root: './' });
})

const port = process.env.PORT || '3000';
app.listen(port, () => console.log("server started;"))
