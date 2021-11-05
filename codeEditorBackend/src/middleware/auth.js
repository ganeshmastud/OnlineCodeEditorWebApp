const jwt = require( 'jsonwebtoken' );

const authenticate = ( req, res, next ) => {
    const token = req.header( 'Authorization' );
    // console.log("token ",token);
    if( !token ) {
        const error = new Error( 'Token is not sent' );
        error.status = 401;
        return next( error );
    } else{
        console.log("Token exist :",token)
    }
    
    // 'abcd' is the secret key - please store this in process.env.* where * is some environment variable like JWT_SECRET (say)
    jwt.verify( token, 'JWT_SECRET_KEY', async ( err, claims ) => {
        if( err ) {
            const error = new Error( 'Please login first to get access.' );
            error.status = 403;
            return next( error );
        }

        // res.locals ({}) is used to share information between one middleware and another
        res.locals.claims = claims;

        next();
    });
};

module.exports = {
    authenticate
};