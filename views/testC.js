const express = require('express');
const app = express();
const path = require('path');

console.log("Test Calendly");

app.get('/', function (req, resp) {
    resp.sendFile('test.html', { root: path.join(__dirname ) });
})


const port = process.env.PORT || '3000';
app.listen(port, () => console.log("server started:" + port));

module.exports=app;