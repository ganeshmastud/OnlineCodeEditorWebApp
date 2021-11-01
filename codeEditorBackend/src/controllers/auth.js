const mongoose = require( 'mongoose' );
const User = mongoose.model( 'User' );

const register_validation = require('./common_utils/register_validations');
const jwt = require( 'jsonwebtoken' );


const register = async( req, res, next ) => {
    // console.log("in register");
    let user = req.body;
    // let hashpassword = '';
    // console.log(user)
    if( !user ) {
        const error = new Error( 'User details not sent in request body' );
        next( error );
        return;
    }
    // console.log("user in reg", user)
    // console.log("register_validation ",typeof register_validation.register_validation)
    const register_errors = register_validation.register_validation(user)
    let errors=[]
    // console.log("register_errors ", register_errors)
    if(register_errors.flag===false){
        // errors.concat(errors,register_errors.username_err)
        // errors.concat(errors,register_errors.password_errs)
        // errors.concat(errors,register_errors.retype_password_err)
        // errors.concat(errors,register_errors.email_err)       
       
        if(register_errors.username_err.length >0){
            errors.push(register_errors.username_err);
        }
        if(register_errors.password_errs.length >0){
            errors.push(...register_errors.password_errs);
        }
        // if(register_errors.retype_password_err.length > 0){
        //     errors.push(register_errors.retype_password_err);
        // }
        if(register_errors.email_err.length > 0){
            errors.push(register_errors.email_err);
        }
        console.log("register_errors ",errors)
        const error=new Error(errors)
        // return next(error);
        res.send(errors);

    }else{
        
        
        await User
        .create( user )
        .then( updatedUser => {
            const dataToSend = {
                name: updatedUser.name,
                email: updatedUser.email,
            };

            res.status( 201 ).json( dataToSend );
        })
        .catch( err => {
            if( err.name === 'ValidationError' ) {
                err.status = 400;
            } else {
                err.status = 500;
            }

            return next( err );
        });

    }
    
    

    
};

const login = async ( req, res, next ) => {
    // console.log("in login funciton")
    // this has { email: string, password: string }
    const userdata = req.body;

    if( !userdata ) {
        const error = new Error( 'Login details not sent in request body' );
        next( error );
        return;
    }
    
    if( !userdata.email || !userdata.password ) {
        const error = new Error( 'Login details not sent in request body' );
        next( error );
        return;
    }

    await User
        .findOne( { email: userdata.email } )
        .then(async user => {
            if( !user ) {
                const error = new Error( 'User does not exists with the provided email id' );
                error.status = 404;
                return next( error );
            }

            // check if password matches the hashed one in DB
            await user.checkPassword( userdata.password, ( err, isMatch ) => {
                if( err ) {
                    const error = new Error( 'enter the right email and password' );
                    error.status = 404;
                    return next( error );
                }

                if( !isMatch ) {
                    const error = new Error( 'enter the right email and password' );
                    error.status = 404;
                    return next( error );
                }
                // console.log("USere in login auth ",user, user._id)
                // generate the token
                const claims = {
                    name: user.name,
                    email: user.email,
                   
                };

                // 'abcd' is the secret key - please store this in process.env.* where * is some environment variable like JWT_SECRET (say)
                 jwt.sign( claims, 'JWT_SECRET_KEY' /* process.env.JWT_SECRET */, { expiresIn: 24 * 60 * 60 }, ( err, token ) => {
                    if( err ) {
                        err.status = 500;
                        return next( err );
                    }

                    res.json({
                        email: user.email,
                        token: token,
                        userId:user._id
                    });
                });
            });
        })
        .catch( err => {
            if( err.name === 'ValidationError' ) {
                err.status = 400;
            } else {
                err.status = 500;
            }

            return next( err );
        });
};

module.exports = {
    register,
    login
};