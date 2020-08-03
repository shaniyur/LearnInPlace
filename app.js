const express = require('express');
const mailgun = require("mailgun-js");
const jwt=require('jsonwebtoken');
const DOMAIN = 'sandbox87f6624dab3e425a9c5f5714c82e0395.mailgun.org';
const mg = mailgun({apiKey: '0ecc68153105e99dad062488ec42cb8a-a65173b1-a35997ea', domain: DOMAIN});
const app = express();
const rand=require('randomstring');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
var multer = require('multer');

const crypto=require('crypto');
const mongoose = require('mongoose');
//const xoauth2=require('xoauth');
const mailer=require("nodemailer");
const secret=rand.generate();


const URI = "mongodb+srv://dbUser:summer2020@cluster0.hropv.mongodb.net/test?retryWrites=true&w=majority";

const bdp=require('body-parser');
// //const prod=require('./api/routes/Send.js');

const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');

const path=require('path');
const apiRouter = require('./backend/routes/api');
var connectDB = require('./backend/models/Connection');

connectDB();

app.use(express.json({ extended: false}));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser());
app.use(methodOverride('_method'));
//app.use(multer)
app.set('view engine', 'ejs');

app.use('/api', apiRouter);


app.use(bodyParser());

const storage = new GridFsStorage({
  url: URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'student_uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
//var upload=multer({storage:storage});

// var upload = multer({dest:'uploads/'});

var filstorage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/uploads');
   },
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  }
});

var upload= multer({ storage: filstorage })

// on server this will be http://localhost:post/cssFiles
app.use('/cssFiles',express.static(path.join(__dirname + '../../testhomepg/testhomepg/')));
app.use(express.static('./studentsignup'))


 

app.get('/', function(req, resp) {
    //console.log(__dirname)
    resp.sendFile('home.html', {root:path.join(__dirname+"/homepage")});

 
    //resp.send("this works");
})

app.get('/tutorsignups', function(req,resp) {
    //console.log('Data:' + JSON.stringify(req.body));
   // console.log("tutor signup form works!")
    resp.sendFile('tutorsignups.html', {root:path.join(__dirname, '../')});
})

app.get('/studentsignup', function(req,resp) {
 //   console.log("student signup form works!")
 console.log("headers sent"+resp.headersSent); // false
 res.send('OK');
 console.log(resp.headersSent);
    resp.sendFile('studentsignup.html', {root:path.join(__dirname,"../studentsignup")});
})

app.get('/renderform.js', function(req, resp) {
 //   console.log('render form sent')
    resp.sendFile('renderform.js', {root:path.join(__dirname, '../')})
})

app.post('/tutorsubmit',  upload.array('files', 2), function(req, res) {
  //  console.log(req.body);
  //  console.log(req.files)
  //  console.log('Data:' + JSON.stringify(req.body));

   
 //   console.log('File print out' + req.files)
 
})



let gfs;
const conn = mongoose.createConnection(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
conn.once('open', function () {
   gfs = Grid(conn.db, mongoose.mongo);

   gfs.collection('uploads');
})





var connectDB = require('./backend/models/Connection');
const Student=require('./backend/models/Student');
const { diskStorage } = require('multer');
Student.secret=secret;
Student.active=false;
connectDB();

app.use(express.static('uploads'));
//const email_reg=req.body.email;
app.use(bdp.urlencoded({ extended: false }))
//console.log("email :"+email_reg);

 

// app.post('/Send', function (req, res) {
//   res.send(JSON.stringify(req.body)); 
//   console.log(req.body)
// });
app.use('/api', function (req, res) {
  let url = "http://localhost:3000"+req.body.username;
  req.headers['FromStudent'] = 'FRomStudent';
  req.writeHead("Student");
})

app.post("/Send",upload.single('prodImage'),(req,res,next)=>{
 /// console.log("in the send");
//  console.log(req.file);
//res.headers['Sent From']='Student';
// try {
//   res.send("File :"+req.file);
// }catch(err) {
//   res.send("Oops! Error! " +400);
// }
//res.send(req.body);

// res.send(tempPath);
const fn=req.body.firstName;

const ln=req.body.lastName;

const em=req.body.email;;
console.log("Before");
const token=jwt.sign({fn,ln,em},secret,{expiresIn: '20m'});
console.log("JWT token : "+token);

const email_reg=req.body.email;
app.use(bdp.urlencoded({ extended: false }))
console.log("email :"+email_reg);


Student.findOne({email: req.body.email}, function(err, user){
  if(err) {
    res.send(404);
     }
     if (user) {
      var err = new Error('A user with that email has already registered. Please use a different email..')

       err.status = 400;
      console.log(err);
      // res.json(err);
      res.send(`An account with the Email ${req.body.email} already exists`);
      
     
      return next(err);
      
    }
  else{




   const DBElement=new Student({
    username: req.body.email,
    passwordHash: '',
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    gender:req.body.gender,
    city:req.body.city,
    state:req.body.state,
    country:req.body.Country,
    school:req.body.school,
    grade:req.body.grade,
    subjects:req.body.subjects,
    reasonForTutor:req.body.reasonForTutor,
    duration:req.body.duration,
    sessionFreq:req.body.sessionFreq,
    eligibilityForFreeTutor:req.body.eligibilityForFreeTutor,

   });
   DBElement.save().then(data=>{
    console.log(req.body);
   });
console.log("======>"+process.env.CLIENT_URL);
  const data = {
    from: 'noreply@learnInPlaceteam.com',
    to: req.body.email,
    subject: 'Account Activation Link from LearnInPlace Team',
    html: `<h2>Please click on the link below to activate your account</h2>
    <p>http://localhost:8005/authentication/activate/${token}</p>
    `

  };
  mg.messages().send(data, function (error, body) {
    if(error){
      return res.json({
        error: err.message
      })
    }
    else{

   // console.log(body);
   //res.json({message: 'Email has been sent , please activate your account'});
    }
  });
 
  //  const transporter=mailer.createTransport({
  //   service:'gmail',
  //   auth:{

  //     // xoauth2:xoauth2.createXOAuth2Generator({
  //     user:'inplacelearn@gmail.com',
  //    password:'Password@1234'
  
  //   // })
  // }
  // });
  
  // var mailOptions={
  //   from :'no-reply@learninplace.com',
  //   to:req.body.email,
  //   subject:'Registration Confirmed at LearnInPlace',
  //   text:'<h1>Thanks for Signing Up</h1>'
  // };
  
  // transporter.sendMail(mailOptions,function(error,info){
  // if(error){
  //   console.log(error);
  
  // }
  // else{
  //   console.log('Email sent :'+info.response);
  // }
  // });

  
//console.log(req.file); 
  
//res.send(req.file); 

  return res.redirect('/finalpage.html');
  
  }
}
);
});

// app.get('/contact',(req,res)=>{
  // const transporter=mailer.createTransport({
  //   service:'gmail',
  //   auth:{

  //     // xoauth2:xoauth2.createXOAuth2Generator({
  //     user:'inplacelearn@gmail.com',
  //    password:'Password@1234'
  
  //   // })
  // }
  // });
  
  // var mailOptions={
  //   from :'no-reply@learninplace.com',
  //   to:req.body.email,
  //   subject:'Registration Confirmed at LearnInPlace',
  //   text:'<h1>Thanks for Signing Up</h1>'
  // };
  
  // transporter.sendMail(mailOptions,function(error,info){
  // if(error){
  //   console.log(error);
  
  // }
  // else{
  //   console.log('Email sent :'+info.response);
  // }
  // });
// });

app.get(/^(.+)$/, function(req,resp) {
   //   console.log(req.params[0] + ' GET')
      resp.sendFile(req.params[0], {root:path.join(__dirname)});
})

//retrieve fikes 
app.get('/files',(req,res)=>{
  gfs.files.find().toArray((err,files)=>{
    if(!files || files.length===0){
      return res.status(404).json({
        err :'No file exists'
      });
    }
    return res.json(files);
  });
})

    app.post('/tutorthankyou', (req, res) => {
   //     console.log(req.body);
      });


    


app.get('/tutorthankyou', function(req, resp) {
 //   console.log("tutor thankyou sent")
    //resp.sendFile('tutorthankyou.html', {root:path.join(__dirname, '../')})
    resp.sendFile('tutorthankyou.html', { root: './' });
})

const port = process.env.PORT || '8005';
app.listen(port, () => console.log("server started;"));

module.exports=app;
