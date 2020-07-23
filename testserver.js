var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser());
// on server this will be http://localhost:post/cssFiles
app.use('/cssFiles',express.static(__dirname + '/testhomepg/testhomepg/'));

app.get('/', function(req, resp) {
    resp.sendFile('home.html', {root:path.join(__dirname, '../LearnInPlace/testhomepg/testhomepg')});
})

app.get(/^(.+)$/, function(req,resp) {
    console.log(req.params[0] + ' GET')
    resp.sendFile(req.params[0], {root:path.join(__dirname)});
})

app.post('/tutorsignups.html', function(req, resp) {
    console.log(req.params[0] + 'POST');
    resp.end(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body));
    return resp.redirect('/tutorthankyou.html');
})

// app.post(/^(.+)$/, function(req, resp) {
//     console.log(req.params[0] + 'POST')
//     resp.end(JSON.stringify(req.body));
// })

app.listen(3000, function() {
    console.log('listening at port 3000');
})
