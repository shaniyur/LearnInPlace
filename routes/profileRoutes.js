const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    //res.render('', { user: req.user });
    console.log(('This is your ' + req.user.userType + ' profile, ' + req.user.firstName))
    res.send('This is your ' + req.user.userType + ' profile, ' + req.user.firstName)
});

module.exports = router