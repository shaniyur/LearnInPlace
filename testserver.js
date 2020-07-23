var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser());
// on server this will be http://localhost:post/cssFiles
app.use('/cssFiles',express.static(__dirname + '/testhomepg/testhomepg/'));

app.get('/', function(req, resp) {
    resp.sendFile('home.html', {root:path.join(__dirname, '../learningalliance/testhomepg/testhomepg')});
})

// this case handles the tutor sign up 
app.get(/^(.+)$/, function(req,resp) {
    console.log(req.params[0] + ' GET')
    resp.sendFile(req.params[0], {root:path.join(__dirname)});
})

// change to get
// app.get('/tutorsignups', function(req, resp) {
//     console.log(req.params[0] + 'POST');
//     //resp.end(JSON.stringify(req.body));
//     console.log(JSON.stringify(req.body));
//     //return resp.redirect('/tutorthankyou.html');
// })
//whatever comes from is a post 
app.post('/tutorsubmit', function(req, resp) {
    console.log('Data:' + JSON.stringify(req.body));
    resp.json({message: 'tutor message recieved!!!'})
})


app.listen(3000, function() {
    console.log('listening at port 3000');
})
