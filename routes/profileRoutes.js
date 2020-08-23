const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    console.log(('This is your ' + req.user.userType + ' profile, ' + req.user.firstName))
    if (req.user.userType === "Tutor") {
        res.render('../views/layouts/tutordash.handlebars', { first: req.user.firstName });
    } else {
        res.render('../views/layouts/studentdash.handlebars', { first: req.user.firstName });
    }
});

module.exports = router