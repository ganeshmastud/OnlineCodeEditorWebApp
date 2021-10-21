const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const { exec } = require("child_process");
const fs = require('fs');
const path = require('path')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
        origin:"*"
    })
)
var jsonParser = bodyParser.json();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/',jsonParser, async (req,res) =>{
    // console.log(req);
    // console.log(req.query)
    // console.log("path :",__dirname)
    let writecode = fs.createWriteStream( path.join( __dirname, 'dummy.java'),{flags:'a'})
    // console.log("write code :", writecode )
    writecode.write('\n')
    writecode.write(req.body.codearea)
    writecode.write('\n')
    // console.log(req.body)
    
    writecode.on('error', error =>{
      console.log("error is :",error.message);
    })
    exec("javac dummy.java java Main" , (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    res.send(stdout);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


