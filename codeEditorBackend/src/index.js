const path = require('path')
require('dotenv').config({path: path.resolve(__dirname,'.env')})
require( './data/init' );
const express = require('express')
const app = express()
const port = 3000
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




app.use( express.static(path.join(process.cwd(), 'public')));

// api routers
app.use( indexRouter );
app.use('/api/codes', codeExecution );
app.use('/api/auth', authorizeUser );
app.use('/api/user',user);
app.use('/api/loadcode',jsonParser,loadCode);
app.use('/api/downloadcode',jsonParser, downloadCode)
app.use(errorHandler);


app.use( function(req,res,next){
    res.sendFile( path.join(process.cwd(), 'public', 'index.html'));
});
//sample register user
// const mongoose = require( 'mongoose' );
// const User = mongoose.model('User')
// app.get('/register', (req,res) =>{
  
//   const result = User.create({email:'tonystark@gmail.com',password:'tony@123'})
//   // console.log(User.find().pretty());
//   // res.send(User.find().pretty())
//   res.json(result)
//   res.send("ok")

  
// })
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.post('/',jsonParser, async (req,res) =>{
//     // console.log(req);
//     // console.log(req.query)
//     // console.log("path :",__dirname)
//     let writecode = fs.createWriteStream( path.join( __dirname, 'dummy.py')) //,{flags:'a'} flag is set if tryies to append file
//     // console.log("write code :", writecode )
//     writecode.write('\n')
//     writecode.write(req.body.codearea)
//     writecode.write('\n')
//     // console.log(req.body)
    
//     writecode.on('error', error =>{
//       console.log("error is :",error.message);
//     })
//     exec("python dummy.py" , (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
//     res.send(stdout);
//     })
// })


// db.users.updateOne({email:"johnwick@gmail.com"},
//     {$set:
//       {
         
//             codeFiles:{
//                [{language:"java",path:""}] 
//             }
           
      
//       }
//     }
    
//   })

app.listen(port,  error => {
    if( error ) {
        console.error( error.message );
        return;
    }
    console.log( `Check http://localhost:${port}` );
  })


