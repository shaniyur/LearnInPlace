const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20');
const Tutor = require('../models/Tutor');
const Student = require('../models/Student');
const clientID = require('../env').CLIENT_ID;
const clientSecret = require('../env').CLIENT_SECRET;

var userType = "";

passport.serializeUser((user, done) => {
    //mongodb id
    //console.log("serialize -- ", userType)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //find user based on id in mongo
    //console.log("deserialize -- ", userType)
    if(userType === "tutor"){
        Tutor.findById(id).then((tutor) => {
            done(null, tutor);
        });
    }
    else{
        Student.findById(id).then((student) => {
            done(null, student);
        });
    }
});


passport.use(new GoogleStategy({
    callbackURL: '/auth/google/redirect',
    clientID: clientID,
    clientSecret: clientSecret
}, (accessToken, refreshToken, email, done) => {
    //callback
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
      
    userType = localStorage.getItem('localUserType');

    var userEmail = email.emails[0].value;
    console.log(userEmail, userType);

    if(userType === 'tutor'){
        Tutor.findOne({'email': userEmail}, function(err, user){
            if(user){
                done(null, user);
            }
            else{
                done("Tutor doesn't exist", null);
            }
        })
    }
    else{
        Student.findOne({'email': userEmail}, function (err, studentUser){
            if(studentUser){
                done(null, studentUser);
            }
            else{
                done("Student doesn't exist", null);
            }
        });
    }
}));