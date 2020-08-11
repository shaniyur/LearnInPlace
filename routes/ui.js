const express = require('express');
const router = express.Router();

const path = require('path');
const apiRouter = require('../routes/api');

router.use(express.static('./studentsignup'));
router.use('/api', apiRouter);

router.get('/', function (req, resp) {
    resp.sendFile('home.html', { root: path.join(__dirname, "../views") });
})

router.get('/tutorsignup', function (req, resp) {
    resp.sendFile('tutorsignup.html', { root: path.join(__dirname, '../views') });
})

router.get('/studentsignup', function (req, resp) {
    console.log("headers sent" + resp.headersSent); // false
    console.log(resp.headersSent);
    resp.sendFile('studentsignup.html', { root: path.join(__dirname, "../views") });
})

router.get('/tutor/renderform', function (req, resp) {
    resp.sendFile('renderform.js', { root: path.join(__dirname, '../js') })
})

router.get('/thankyou', function (req, resp) {
    console.log("tutor thankyou sent")
    resp.sendFile('tutorthankyou.html', { root: path.join(__dirname, "../views") });
})

router.get('/finalpage', function (req, resp) {
    console.log("student thankyou sent")
    resp.sendFile('finalpage.html', { root: path.join(__dirname, "../views") });
})

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/tutor/profile');
    }
    else{
        next();
    }
};

router.get('/tutor/profile', authCheck, (req, res) => {
    res.sendFile('test.html', {root: path.join(__dirname, "../views")});
});

router.get('/tutor/profiles', function (req, res) {
    console.log('Get profile details');
    res.sendFile('test.html', {root: path.join(__dirname, "../views")});
})

router.get('/css/home.css', function (req, resp) {
    resp.sendFile('home.css', { root: path.join(__dirname, '../css') });
})

router.get('/css/images/tutor.svg', function (req, resp) {
    resp.sendFile('tutor.svg', { root: path.join(__dirname, '../css/images') });
})

router.get('/css/images/student.svg', function (req, resp) {
    resp.sendFile('student.svg', { root: path.join(__dirname, '../css/images') });
})

router.get('/css/images/connect.svg', function (req, resp) {
    resp.sendFile('connect.svg', { root: path.join(__dirname, '../css/images') });
})

router.get('/css/images/confirm.svg', function (req, resp) {
    resp.sendFile('confirm.svg', { root: path.join(__dirname, '../css/images') });
})

router.get('/countrystatecity', function (req, resp) {
    resp.sendFile('countrystatecity.js', { root: path.join(__dirname, '../js') });
})

router.get('/checkall', function (req, resp) {
    resp.sendFile('checkall.js', { root: path.join(__dirname, '../js') });
})


// const port = process.env.PORT || '3000';
// app.listen(port, () => console.log("server started:" + port));
module.exports = router;

