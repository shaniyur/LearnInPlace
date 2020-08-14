const express=require('express');


const router = express.Router();


router.post('/email-activate')
console.log("here in auth");
router.post("/", (req, res)=>{
    
    // res.send(JSON.stringify(req.body)); 
    console.log(req.body)
    
});
module.exports = router;