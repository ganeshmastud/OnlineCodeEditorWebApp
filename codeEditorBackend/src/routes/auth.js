const express = require( 'express' );
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const { 
    register,
    login
} = require( '../controllers/auth' );

const router = express.Router();

router.post( '/register',jsonParser, register );
router.post( '/login',jsonParser, login );

module.exports = router;