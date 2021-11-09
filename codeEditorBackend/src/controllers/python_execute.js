require( '../data/init' );
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { exec } = require("child_process");
const fs = require('fs');
const path = require('path')
const mongoose = require( 'mongoose' );
const User = mongoose.model('User')
const nanoid = require('nanoid')

const python_execute = async (req,res,next) =>{

    // console.log("you are in python exec flie in controller");
    if(!req.body){
        const error = new Error( 'no data received in request' );
        error.status = 404;
        return next( error );
    } 
    const {userId,select_language,codearea }= req.body; 
    // console.log("req.body ",req.body);
    const selectLanguage = select_language;
    const codeArea =codearea;
    const codeInputValidationErr= await codeInputValidation.codeInputValidation(userId,selectLanguage,codeArea)
    if(codeInputValidationErr){
        next(codeInputValidationErr)
    }
    
    
    
        // console.log("path :",__dirname)
    
    // const pyFilePath=path.join(codeDir, 'dummy.py')
    const filter = {"_id" : userId}
    let codeForLangPresent=false;
    const codeDir = 'CodeFiles/python';

    let pyFilePath =''
    const ifFilepathExistInDb = await User.find(filter)
    
    ifFilepathExistInDb[0].codeFiles.forEach(codeFile =>{
        if(codeFile.language === selectLanguage){
            codeForLangPresent=true;
            pyFilePath = codeFile.filepath;
            // console.log("file path exist")
            return;
        }
    } )
    // console.log("ifFilepathExistInDb ",ifFilepathExistInDb[0].codeFiles);

    if(!codeForLangPresent){


        
        const id = nanoid(5)
        const pythonPath = 'py'+id+'.py'
        pyFilePath = path.resolve(codeDir, pythonPath)  //important when trying to access the pat using path.jion error was thrown
        console.log("path resolve :",pyFilePath);

        const update = {language:selectLanguage, filepath:pyFilePath};
        let doc = await User.findOneAndUpdate(filter, {$push:{ codeFiles:update }}, {
            returnOriginal: false
        })
        // console.log("doc ",doc);
    }
    
    let writecode = await fs.createWriteStream( pyFilePath) //,{flags:'a'} flag is set if tryies to append file
        // console.log("write code :", writecode )
        
        writecode.write(codeArea)
        
        // console.log(req.body)
        
        writecode.on('error', error =>{
            
        // console.log("error is :",error.message);
        return next(error.message)
        })
    await exec(`python ${pyFilePath}` , (error, stdout, stderr) => {
    if (error) {
        // console.log(`error: ${error.message}`);
        // const replace_str = new RegExp(pyFilePath,'g')
        // const updatedError = error.message.replace(replace_str, '')
        const updatedError = error.message.split(pyFilePath).join('');
        return next(updatedError);
    }
    if (stderr) {
        // console.log(`stderr: ${stderr}`);
        
        return next(stderr);
    }
    // console.log(`stdout: ${stdout}`);
    res.status(200)
    res.send(stdout);
    return;
    })
     
    
}

module.exports = {
    python_execute
}