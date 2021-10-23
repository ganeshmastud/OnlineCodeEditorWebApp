
const express = require( 'express' );
const { postMessage } = require( '../controllers/index' );

const router = express.Router();

router.post( '/', postMessage );

module.exports = router;