const path = require('path')
require('dotenv').config({path: path.resolve(__dirname,'.env')})
require( './data/init' );
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const { exec } = require("child_process");
const fs = require('fs');


const codeExecution = require( './routes/code_executions' );
const indexRouter = require( './routes/index' );
const authorizeUser = require( './routes/auth' );
const user = require('./routes/user')
const loadCode = require('./routes/loadCode')

const downloadCode =require('./routes/downloadCode')
// const {authenticate} = require('./middleware/auth')  //if this middleware is added in main or index js it
                                                        //will throw error 
// app.use(authenticate)
const errorHandler = require('./middleware/error');

app.use(bodyParser.urlencoded({ extended: true }))
if(process.env.NODE_ENV === 'development')
app.use(cors({
        origin:"*"
    })
)
var jsonParser = bodyParser.json();
// console.log("code_execution :",code_execution); 



// console.log("path",express.static(path.join(process.cwd(),'src', 'public')))
app.use( express.static(path.join(process.cwd(),'src', 'public')));

// api routers
app.use( indexRouter );
app.use('/api/codes', codeExecution );
app.use('/api/auth', authorizeUser );
app.use('/api/user',user);
app.use('/api/loadcode',jsonParser,loadCode);
app.use('/api/downloadcode',jsonParser, downloadCode)
app.use(errorHandler);


app.use('/', function(req,res,next){
    console.log("app routes");
    // console.log(path.join(path.resolve(process.cwd(),'src'), 'public', 'index.html'));
    console.log("in // ", path.join(process.cwd(),'src', 'public', 'index.html'));
    res.sendFile( path.join(process.cwd(),'src', 'public', 'index.html'));
});
 console.log("in // ", path.join(process.cwd(),'src', 'public', 'index.html'));
console.log("in index js");
app.listen(port,  error => {
    if( error ) {
        console.error( error.message );
        return;
    }
    // console.log( `Check http://localhost:${port}` );
  })

