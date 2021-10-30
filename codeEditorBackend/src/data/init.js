// create the models to talk to the DB
require( '../models/User' );
require( '../models/codefiles' );


const mongoose = require( 'mongoose' );

mongoose.set( 'returnOriginal', false );
mongoose.set( 'runValidators', true );
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;
// mongoose.set( 'useFindAndModify', false );

// mongodb is the name of the service
// if( process.env.DOCKER === 'NO_DOCKER' ) {
//     console.log( 'Connecting to mongodb://localhost:27017/workshopsDB' );
//     mongoose.connect( 'mongodb://localhost:27017/workshopsDB' );
// } else {
//     console.log( 'Connecting to mongodb://mongodb/workshopsDB' );
//     mongoose.connect( 'mongodb://mongodb/workshopsDB' );
// }
// console.log(DB_USER, DB_HOST, DB_NAME,DB_PASSWORD);
//NODE_ENV === 'development'? 'mongodb://localhost:27017/CodeEditor':
const connect_DB_str = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
//`mongodb+srv://CodeEditorAdmin:CodeEditor123@cluster0.ygozd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
mongoose.connect( connect_DB_str );
//mongodb+srv://CodeEditorAdmin:<password>@cluster0.ygozd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connection.on( 'connected', () => {
    console.log( 'connected to mongodb' );
});

mongoose.connection.on( 'error', error => {
    console.error( error.message );
});

mongoose.connection.on( 'disconnect', error => {
    console.error( error.message );
});