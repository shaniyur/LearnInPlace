const router = require('express').Router();


const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('../views/layouts/index.handlebars', { first: req.user.firstName });
    console.log(('This is your ' + req.user.userType + ' profile, ' + req.user.firstName))
        //res.send('This is your ' + req.user.userType + ' profile, ' + req.user.firstName)
});

module.exports = router