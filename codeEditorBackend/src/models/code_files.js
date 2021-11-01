const mongoose = require( 'mongoose' );


const codefileSchema = new mongoose.Schema({
    language:String,
    filepath:String
})

module.exports = codefileSchema;