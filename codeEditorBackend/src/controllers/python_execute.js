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

    console.log("you are in python exec flie in controller");
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
    
    // const pyfilepath=path.join(code_dir, 'dummy.py')
    const filter = {"_id" : userId}
    let code_for_lang_present=false;
    const code_dir = 'CodeFiles/python';

    let pyfilepath =''
    const if_filepath_exist_in_db = await User.find(filter)
    
    if_filepath_exist_in_db[0].codeFiles.forEach(code_file =>{
        if(code_file.language === select_language){
            code_for_lang_present=true;
            pyfilepath = code_file.filepath;
            console.log("file path exist")
            return;
        }
    } )
    // console.log("if_filepath_exist_in_db ",if_filepath_exist_in_db[0].codeFiles);

    if(!code_for_lang_present){


        
        const id = nanoid(5)
        const python_path = 'py'+id+'.py'
        pyfilepath = path.resolve(code_dir, python_path)  //important when trying to access the pat using path.jion error was thrown
        // console.log("path resolve :",pyfilepath);

        const update = {language:select_language, filepath:pyfilepath};
        let doc = await User.findOneAndUpdate(filter, {$push:{ codeFiles:update }}, {
            returnOriginal: false
        })
        // console.log("doc ",doc);
    }
    
    let writecode = await fs.createWriteStream( pyfilepath) //,{flags:'a'} flag is set if tryies to append file
        // console.log("write code :", writecode )
        
        writecode.write(req.body.codearea)
        
        // console.log(req.body)
        
        writecode.on('error', error =>{
            
        console.log("error is :",error.message);
        return next(error.message)
        })

    await exec(`python ${pyfilepath}` , (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);

        return next(error.message);
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return next(stderr);
    }
    console.log(`stdout: ${stdout}`);
    res.status(200)
    res.send(stdout);
    return;
    })
     
    
}

module.exports = {
    python_execute
}