const errorHandler = ( error, req, res, next ) => {
    console.log("received error in error js",String(error),"err status ", error.status)
    const msg = error.message?error.message : error
    if(error.status){
        res.status(error.status);
        res.send(error.message)
    }
    // res.status( error.status || 500 );
    const err = {"err":true, "msg": String(error)}
    res.send(err)
};

module.exports = errorHandler
