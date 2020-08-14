const router = require('express').Router();

router.get('/activate/:token', function(req, res) {
    console.log(req.protocol + ":/" + req.get('host'));
    console.log(req.params);
    console.log(req.body);
    // if((req.protocol+"://"+req.get('host'))==("http://"+host))
    // {
    //     console.log("Domain is matched. Information is from Authentic email");
    //     if(req.query.id==rand)
    //     {
    //         console.log("email is verified");
    //         res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
    //     }
    //     else
    //     {
    //         console.log("email is not verified");
    //         res.end("<h1>Bad Request</h1>");
    //     }
    // }
    // else
    // {
    //     res.end("<h1>Request is from unknown source");
    // }
});

module.exports = router