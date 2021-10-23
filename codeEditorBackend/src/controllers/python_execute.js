require( '../data/init' );
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const { exec } = require("child_process");
const fs = require('fs');
const path = require('path')
const mongoose = require( 'mongoose' );
const User = mongoose.model('User')

const python_execute = async (req,res,next) =>{

    console.log("you are in python exec flie inn controller");
    if(!req.body){
        const error = new Error( 'no data received in request' );
        error.status = 404;
        return next( error );
    } 
    const {userId,select_language,codearea }= req.body; 
    
        // console.log("path :",__dirname)
    const code_dir = '../CodeFiles'
    
    let writecode = fs.createWriteStream( path.join(code_dir, 'dummy.py')) //,{flags:'a'} flag is set if tryies to append file
    // console.log("write code :", writecode )
    writecode.write('\n')
    writecode.write(req.body.codearea)
    writecode.write('\n')
    // console.log(req.body)
    
    writecode.on('error', error =>{
      console.log("error is :",error.message);
    })
    const pyfilepath=path.join(code_dir,'dummy.py')
   
    const filter = {"_id" : userId}
    const update = {language:select_language, path:""};
    let doc = await User.findOneAndUpdate(filter, {$push:{ codeFiles:update }}, {
        returnOriginal: false
    })
    console.log("doc ",doc);
    await exec(`python ${pyfilepath}` , (error, stdout, stderr) => {
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

    // res.send("ok");
    next();
    //  try {
    //     const user = await User.updateOne({id:userId},{$set:{code_files:}});
        
    //     if( !removed ) {
    //         const error = new Error( 'Workshop not found' );
    //         error.status = 404;
    //         return next( error );
    //     }
        
    //     res.status( 204 ).send(); // 204 -> success but nothing sent in response body
    // } catch( error ) {
    //     error.status = 500;
    //     next( error );
    // }
}
// console.log("controller pytho_Exec ",python_execute)

module.exports = {
    python_execute
}