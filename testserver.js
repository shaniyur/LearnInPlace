var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();
//const bkRouter = require('./backend/app.js');

var bodyParser = require('body-parser');

//app.use('/',bkRouter);
app.use(bodyParser());
// on server this will be http://localhost:post/cssFiles
app.use('/cssFiles',express.static(__dirname + '/testhomepg/testhomepg/'));
//app.use('/images',express.static(__dirname + '/studentsignup/'));
app.get('/', function(req, resp) {
    resp.sendFile('home.html', {root:path.join(__dirname, '../learningalliance/testhomepg/testhomepg')});
})

// this case handles the tutor sign up 
app.get(/^(.+)$/, function(req,resp) {
    console.log(req.params[0] + ' GET')
    resp.sendFile(req.params[0], {root:path.join(__dirname)});
})

//whatever comes from is a post 
app.post('/tutorsubmit', function(req, resp) {
    console.log('Data:' + JSON.stringify(req.body));
    resp.json({message: 'tutor message recieved!!!'})
    //resp.send('hsahsaj')
    //resp.redirect('/tutor/register');
    // this is the header issue
    //resp.sendFile('tutorthankyou.html', {root:path.join(__dirname)})
})

app.listen(3000, function() {
    console.log('listening at port 3000');
})

//module.exports = router;