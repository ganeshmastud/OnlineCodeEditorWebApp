
const express = require( 'express' );
const { postMessage } = require( '../controllers/index' );

const router = express.Router();

router.post( '/api/', postMessage );

module.exports = router;