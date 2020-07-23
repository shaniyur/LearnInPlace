var express = require('express');
var path = require('path');
var app = express();
// on server this will be http://localhost:post/cssFiles
app.use('/cssFiles',express.static(__dirname + '/testhomepg/testhomepg/'));

app.get('/', function(req, resp) {
    resp.sendFile('home.html', {root:path.join(__dirname, '../learningalliance/testhomepg/testhomepg')});
})

app.get(/^(.+)$/, function(req,resp) {
    console.log(req.params)
    resp.sendFile(req.params[0], {root:path.join(__dirname)});
})

app.listen(3000, function() {
    console.log('listening at port 3000');
})