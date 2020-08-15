const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRouter = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes')
const passportSetup = require('./services/passportSetup')
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox87f6624dab3e425a9c5f5714c82e0395.mailgun.org';
const mg = mailgun({ apiKey: '0ecc68153105e99dad062488ec42cb8a-a65173b1-a35997ea', domain: DOMAIN });
const exphbs = require('express-handlebars');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const uiRouter = require('./routes/ui');
const apiRouter = require('./routes/api');
const activateRouter = require('./routes/activateRoutes');




app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser());

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.engine('handlebars', exphbs({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/layouts/"
}));
app.set('view engine', 'handlebars');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['cookieenckey']
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', uiRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/authentication', activateRouter);

let gfs;


app.use(express.static('uploads'));
//const email_reg=req.body.email;

//retrieve files 
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        return res.json(files);
    });
})


const port = process.env.PORT || '3000';
app.listen(port, () => console.log("server started:" + port));

module.exports = app;