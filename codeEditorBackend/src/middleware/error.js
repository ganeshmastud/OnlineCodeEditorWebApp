const errorHandler = ( error, req, res, next ) => {
    console.log("received error in error js",String(error))
    const msg = error.message?error.message : error
    res.status( error.status || 500 );
    res.send(String(error))
};

module.exports = errorHandler
