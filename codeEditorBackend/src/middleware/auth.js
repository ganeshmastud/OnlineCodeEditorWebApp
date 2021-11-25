const jwt = require( 'jsonwebtoken' );

const authenticate = async ( req, res, next ) => {
    const token = await req.header( 'Authorization' );
    // console.log("token ",token);
    if( !token ) {
        const error = new Error( 'Token is not sent' );
        error.status = 401;
        return next( error );
    } 
    // else{
    //     console.log("Token exist :",token)
    // }
    
    // 'abcd' is the secret key - please store this in process.env.* where * is some environment variable like JWT_SECRET (say)
    // console.log("process.env.JWT_SECRET_KEY",process.env.JWT_SECRET_KEY)
    await jwt.verify( token, process.env.JWT_SECRET_KEY, ( err, claims ) => {
        if( err ) {
            console.log("err in jwt verify",err);
            const error = new Error( 'Token is expired, Please login first to get access.' );
            error.status = 403;
            next( error );
            return;
        }

        // res.locals ({}) is used to share information between one middleware and another
        res.locals.claims = claims;

        next();
    });
};

module.exports = {
    authenticate
};