require( '../data/init' );
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { spawn } = require("child_process");
const fs = require('fs');
const path = require('path')
const mongoose = require( 'mongoose' );
const User = mongoose.model('User')
const nanoid = require('nanoid')
const util = require('util');
const exec_async = util.promisify(require('child_process').exec);
const c_execute = async (req,res,next) =>{

    // console.log("you are in c exec flie in controller");
    if(!req.body){
        const error = new Error( 'no data received in request' );
        error.status = 404;
        return next( error );
    } 
    const {userId,select_language,codearea }= req.body; 
    const selectLanguage = select_language;
    const codeArea =codearea;
    const codeInputValidationErr= await codeInputValidation.codeInputValidation(userId,selectLanguage,codeArea)
    if(codeInputValidationErr){
        next(codeInputValidationErr)
    }
    
    
    
        // console.log("path :",__dirname)
    
    // const pyfilepath=path.join(codeDir, 'dummy.py')
    const filter = {"_id" : userId}
    let codeForLangPresent=false;
    const codeDir = 'CodeFiles/c';
    let cFilePath =''
    const ifFilepathExistInDb = await User.find(filter)
    let cExeFile = ''
    if(ifFilepathExistInDb[0].codeFiles.length>0){
        ifFilepathExistInDb[0].codeFiles.forEach(codeFile =>{
            // console.log("codeFile ", codeFile)
            if(codeFile.language === selectLanguage){
                codeForLangPresent=true;
                cFilePath = codeFile.filepath;
                cExeFile =codeFile.filepath;
                console.log("cExeFile ",cExeFile);
                cExeFile =cExeFile.slice(0,-2)
                // console.log("file path exist")
                return;
            }
        } )
    }
    
    // console.log("ifFilepathExistInDb ",ifFilepathExistInDb[0].codeFiles);

    if(!codeForLangPresent){


        
        const id = nanoid(5)
        const cPath = 'c'+id+'.c'
        cExeFile = path.resolve(codeDir,'c'+id)
        cFilePath =  path.resolve(codeDir, cPath)  //important when trying to access the pat using path.jion error was thrown
        // console.log("path resolve :",pyfilepath);

        let update = {language:selectLanguage, filepath:cFilePath};
        // console.log("update ",update)
        let doc = await User.findOneAndUpdate(filter, {$push:{ codeFiles:{$each:[update]} }}, {
            returnOriginal: false
        })
        // console.log("doc ",doc);
    }
    
    let writecode =  fs.createWriteStream( cFilePath) //,{flags:'a'} flag is set if tryies to append file
        // console.log("write code :", writecode )
        
        writecode.write(codeArea)
        
        // console.log(req.body)
        
        writecode.on('error', error =>{
        // console.log("error is :",error.message);
        next(error.message)
        return;
        })
        writecode.close();
    // fileToExe(cExeFile,cFilePath)
   const compiler =  spawn(`gcc`, [cFilePath,'-o', cExeFile])
        compiler.stdout.on('data', (data) => {
        // console.log(`stdout: ${data}`);
        res.send(data)
        });
        compiler.stderr.on('data', (data) => {
        // console.log(`compile-stderr: ${String(data)}`);
        const updatedError = String(data).split(cFilePath).join('');
        return next(updatedError);
        });
        compiler.on('close', (data) => {
        if (data === 0) {
            execute(cExeFile);
        }
        });
    

    // let exe_file = path.resolve(codeDir, cExeFile)
    console.log("cExeFile 2:",cExeFile)
    async function execute(cExeFile) {
        const { stdout, stderr } = await exec_async(cExeFile);
            // console.log('stdout:', stdout);
            if(stdout){
                res.status(200)
                res.send(stdout)
            }
            if(stderr){
                // console.error('exe stderr:', stderr);
                next(stderr)
            }
            // console.error('stderr:', stderr);
        }
    // function execute(cExeFile){
    //     const executor = spawn(cExeFile, [],[]);
    //     executor.stdout.on('data', (output) => {
    //         console.log('stdout ',String(output));
    //         // callback('0', String(output)); // 0, no error
    //     });
    //     executor.stderr.on('data', (output) => {
    //         console.log(`stderr: ${String(output)}`);
    //         // callback('2', String(output)); // 2, execution failure
    //     });
    //     executor.on('close', (output) => {
    //         console.log(`stdout: ${output}`);
    //         res.sendStatus(200)
    //         res.send(output);
    //     });
    // }
    
    
    // let stdout = runExe(cExeFile)
    
    
        
}
// const fileToExe = (cExeFile,cFilePath) => {
//      exec(`gcc -o ${cExeFile} ${cFilePath}` , (error, stdout, stderr) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//     })
// }

// function runExe(cExeFile){
//         exec(`${cExeFile}`, (error, stdout, stderr) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//         // console.log(`stdout: ${stdout}`);
        
//         return stdout;
     
//     })
// }



module.exports = {
    c_execute
}