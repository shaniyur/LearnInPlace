
const router = require('express').Router();
const passport = require('passport');



router.get('/google', function(req, res, next) {
    //console.log(req.query.db)
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
      
    localStorage.setItem('localUserType', req.query.db);
    next();
}, passport.authenticate('google', {
    //email, profile, etc
    scope: ['email']
}));

router.get('/logout', function(req, res){
    //res.send('Logging out');
    req.logOut();
    res.redirect('/');
});

router.get('/google/redirect', passport.authenticate('google'), function(req, res){
    res.redirect('/tutor/profile/');
    //req will  now have user record from mongo when logged in for this
})

module.exports = router;