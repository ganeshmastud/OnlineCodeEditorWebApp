const mongoose = require( 'mongoose' );

const codefileSchema = require('./codefiles');

const userSchema = new mongoose.Schema({
     email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    codeFiles:[codefileSchema]   
})

mongoose.model( 'User', userSchema );


// const result = new User({email:'johnsnow@gmail.com',password:'johnsnow',codeFiles:[{language:'c',path:''}]})
// console.log(User.find().pretty());
