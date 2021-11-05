// const path = require( 'path' );

const postMessage = ( req, res ) => {
    // console.log( req.body );
    res.end( 'You are in index route' );
}

module.exports = {
    postMessage
};