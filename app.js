
var express = require('express');
var app = express();
const bdp=require('body-parser');



app.use(bdp.urlencoded({ extended: true }))

app.get('/',(req,res)=>{

    res.sendFile(__dirname + '/StudentSign.html');
    

});


    app.post('/tutorthankyou', (req, res) => {
        console.log(req.body)
      });

    //   app.post('/StudentAlert', (req, res) => {
    //     console.log(req.body)
    //   });

    // app.post('/Send', function(req, res) {
    //     console.log("BODY"+req.body); //Output=> like { searchid: 'Array of checked checkbox' }
    //     console.log("SEARCH"+req.body.searchid); // to get array of checked checkbox
    
    //    res.sendFile(__dirname + '/test.html')
    //     //res.send(JSON.stringify(req.body))
    //     console.log(req.body)
    //   });
    app.post('/Send', function (req, res) {
      console.log(req.body); //Output=> like { searchid: 'Array of checked checkbox' }
      console.log(req.body.searchid); // to get array of checked checkbox
  });

    

app.listen(3001, function() {
    console.log('listening on 3000')
  });