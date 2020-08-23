
const router = require('express').Router();
const passport = require('passport');



router.get('/google', passport.authenticate('google', {
    //email, profile, etc
    scope: ['email']
}));

router.get('/logout', function(req, res){
    //res.send('Logging out');
    req.logOut();
    res.redirect('/');
});

router.get('/google/redirect', passport.authenticate('google'), function(req, res){
    res.redirect('/profile/');
    //req will  now have user record from mongo when logged in for this
})

module.exports = router;