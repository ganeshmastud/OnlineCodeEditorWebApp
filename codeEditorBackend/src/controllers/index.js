// const path = require( 'path' );

const postMessage = ( req, res ) => {
    console.log( req.body );
    res.end( 'I have noted your message' );
}

module.exports = {
    postMessage
};