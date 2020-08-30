const express = require('express');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox87f6624dab3e425a9c5f5714c82e0395.mailgun.org';
const mg = mailgun({ apiKey: '0ecc68153105e99dad062488ec42cb8a-a65173b1-a35997ea', domain: DOMAIN });
const app = express.Router();

const path = require('path');
const apiRouter = require('../routes/api');

app.use(express.static('./studentsignup'));
app.use('/api', apiRouter);

app.get('/', function(req, resp) {
    resp.sendFile('newhome.html', { root: path.join(__dirname, "../views") });
})

app.get('/tutorsignup', function(req, resp) {
    resp.sendFile('tutorsignup.html', { root: path.join(__dirname, '../views') });
})

app.get('/studentsignup', function(req, resp) {
    console.log("headers sent" + resp.headersSent); // false
    console.log(resp.headersSent);
    resp.sendFile('studentsignup.html', { root: path.join(__dirname, "../views") });
})

app.get('/tutor/renderform', function(req, resp) {
    resp.sendFile('renderform.js', { root: path.join(__dirname, '../js') })
})

app.get('/thankyou', function(req, resp) {
    console.log("tutor thankyou sent")
    resp.sendFile('tutorthanks.html', { root: path.join(__dirname, "../views") });
})

app.get('/finalpage', function(req, resp) {
    console.log("student thankyou sent")
    resp.sendFile('studentthankyou.html', { root: path.join(__dirname, "../views") });
})

app.get('/comingsoon', function(req, resp) {
    resp.sendFile('Comingsoon.html', { root: path.join(__dirname, '../views') });
})

app.get('/css/home.css', function(req, resp) {
    resp.sendFile('newhome.css', { root: path.join(__dirname, '../css') });
})

app.get('/css/studentthankyou.css', function(req, resp) {
    resp.sendFile('studentthankyou.css', { root: path.join(__dirname, '../css') });
})

app.get('/css/studentthanks.css', function(req, resp) {
    resp.sendFile('studentthanks.css', { root: path.join(__dirname, '../css') });
})

app.get('/css/tutor_signup.css', function(req, resp) {
    resp.sendFile('tutor_signup.css', { root: path.join(__dirname, '../css') });
})

app.get('/css/images/5SCENE.svg', function(req, resp) {
    resp.sendFile('5SCENE.svg', { root: path.join(__dirname, '../css/images') });
})

app.get('/css/images/Student_Studying_Scene.svg', function(req, resp) {
    resp.sendFile('Student_Studying_Scene.svg', { root: path.join(__dirname, '../css/images') });
})

app.get('/css/images/student.svg', function(req, resp) {
    resp.sendFile('student.svg', { root: path.join(__dirname, '../css/images') });
})

app.get('/css/images/connect.svg', function(req, resp) {
    resp.sendFile('connect.svg', { root: path.join(__dirname, '../css/images') });
})

app.get('/css/images/confirm.svg', function(req, resp) {
    resp.sendFile('confirm.svg', { root: path.join(__dirname, '../css/images') });
})
app.get('/css/images/English_Icon.svg', function(req, resp) {
    resp.sendFile('English_Icon.svg', { root: path.join(__dirname, '../css/images') });
})
app.get('/css/images/TUTOR_SIGN_UP_SCENE.svg', function(req, resp) {
    resp.sendFile('TUTOR_SIGN_UP_SCENE.svg', { root: path.join(__dirname, '../css/images') });
})

app.get('/css/images/Math_Icon.svg', function(req, resp) {
    resp.sendFile('Math_Icon.svg', { root: path.join(__dirname, '../css/images') });
})

app.get('/css/images/Science_Icon.svg', function(req, resp) {
    resp.sendFile('Science_Icon.svg', { root: path.join(__dirname, '../css/images') });
})

app.get('/countrystatecity', function(req, resp) {
    resp.sendFile('countrystatecity.js', { root: path.join(__dirname, '../js') });
})

app.get('/checkall', function(req, resp) {
    resp.sendFile('checkall.js', { root: path.join(__dirname, '../js') });
})

app.get('/css/dashboard.css', function(req, resp) {
    resp.sendFile('dashboard.css', { root: path.join(__dirname, '../css') });
})

app.get('/tutorhomepg', function(req, resp) {
    resp.sendFile('dashboardscript.js', { root: path.join(__dirname, '../js') });
})

// app.get('/css/intermediate.css', function(req, resp) {
//     resp.sendFile('intermediate.css', { root: path.join(__dirname, '../css') });
// })

// app.get('/tutorcal', function(req, resp) {
//     console.log("tutor calendly form sent")
//     resp.sendFile('calendlysubmission.html', { root: path.join(__dirname, "../views") });
// })

// app.get('/tutorverification', function(req, resp) {
//     console.log("tutor verification page sent")
//     resp.sendFile('pleaseveri.html', { root: path.join(__dirname, "../views") });
// })

app.get('/profile/401', function(req, resp) {
    resp.sendFile('401.html', { root: path.join(__dirname, '../views') });
})


// const port = process.env.PORT || '3000';
// app.listen(port, () => console.log("server started:" + port));
module.exports = app;