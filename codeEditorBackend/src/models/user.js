const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );
const codefileSchema = require('./code_files');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:9
    },
     email: {
        type: String,
        required: true,
        unique: true,
        minlength:5
    },
    password: {
        type: String,
        required: true,
        minlength:8

    },
    language:{
        type:String
    },
    theme:{
        type:String
    },
    codeFiles:[codefileSchema]   
})

const SALT_FACTOR = 10;
userSchema.pre( 'save', function( done ) {
    const user = this;

    // password has not been updated
    if( !user.isModified( 'password' ) ) {
        return done();
    }

    // password has been updated - hash and save it
    bcrypt.genSalt( SALT_FACTOR, ( err, salt ) => {
        if( err ) {
            return done( err );
        }
        
        bcrypt.hash( user.password, salt, ( err, hashedPassword ) => {
            if( err ) {
                return done( err );
            }

            user.password = hashedPassword;
            done();
        });
    });
});

userSchema.methods.checkPassword = function( password, done ) {
    bcrypt.compare( password, this.password, ( err, isMatch ) => {
        done( err, isMatch );
    });
};

mongoose.model( 'User', userSchema );


// const result = new User({email:'johnsnow@gmail.com',password:'johnsnow',codeFiles:[{language:'c',path:''}]})
// console.log(User.find().pretty());
