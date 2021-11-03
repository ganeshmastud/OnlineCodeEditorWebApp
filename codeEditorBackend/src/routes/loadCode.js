const express = require( 'express' );
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const router = express.Router();

const loadCode = (req,res,next) => {
    console.log(req.params,req.query,req.body);
    res.send("ok")
}

router.post('/',loadCode)


module.exports = router;