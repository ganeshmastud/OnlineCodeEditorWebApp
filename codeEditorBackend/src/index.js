require( './data/init' );
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const { exec } = require("child_process");
const fs = require('fs');
const path = require('path')

const code_execution = require( './routes/code_executions' );
const indexRouter = require( './routes/index' );
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
        origin:"*"
    })
)
var jsonParser = bodyParser.json();
// console.log("code_execution :",code_execution); 
// api routers
app.use( indexRouter );
app.use('/codes', code_execution );

const mongoose = require( 'mongoose' );
const User = mongoose.model('User')
app.get('/register', (req,res) =>{
  
  const result = User.create({email:'johnsnow@gmail.com',password:'johnsnow'})
  // console.log(User.find().pretty());
  // res.send(User.find().pretty())
  res.json(result)
  res.send("ok")

  
})
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


