require( '../data/init' );
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { exec,spawn } = require("child_process");
const fs = require('fs');
const path = require('path')
const mongoose = require( 'mongoose' );
const User = mongoose.model('User')
const nanoid = require('nanoid')
const util = require('util');
const exec_async = util.promisify(require('child_process').exec);

const cpp_execute = async (req,res,next) =>{
  
    try{
        // console.log("you are in cpp exec flie in controller");
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
        
        // const pyfilepath=path.join(code_dir, 'dummy.py')
        // console.log("userId ",userId)
        const filter = {"_id" : userId}
        let codeForLangPresent=false;
        const code_dir = 'CodeFiles/cpp';

        let cppFilePath =''
        const ifFilepathExistInDb = await User.find(filter)
        // console.log("ifFilepathExistInDb ",ifFilepathExistInDb)
        let cppExeFile = ''
        if(ifFilepathExistInDb[0].codeFiles.length>0){
            ifFilepathExistInDb[0].codeFiles.forEach(codeFile =>{
                // console.log("codeFile ", codeFile)
                if(codeFile.language === selectLanguage){
                    codeForLangPresent=true;
                    cppFilePath = codeFile.filepath;
                    cppExeFile =codeFile.filepath;
                    // console.log("c_exe_file ",c_exe_file);
                    cppExeFile =cppExeFile.slice(0,-4)
                    // console.log("file path exist")
                    return;
                }
            } )
        }
        
        // console.log("ifFilepathExistInDb ",ifFilepathExistInDb[0].codeFiles);

        if(!codeForLangPresent){


            
            const id = nanoid(5)
            const cppPath = 'cpp'+id+'.cpp'
            cppExeFile = path.resolve(code_dir,'cpp'+id)
            cppFilePath = path.resolve(code_dir, cppPath)  //important when trying to access the path using path.join error was thrown
            // console.log("path resolve :",pyfilepath);
            // console.log("cppFilePath ",cppFilePath)
            let update = {language:selectLanguage, filepath:cppFilePath};
            // console.log("update ",update)
            let doc = await User.findOneAndUpdate(filter, {$push:{ codeFiles:{$each:[update]} }}, {
                returnOriginal: false
            })
            // console.log("doc ",doc);
        }
        
        let writecode =  fs.createWriteStream( cppFilePath) //,{flags:'a'} flag is set if tryies to append file
            // console.log("write code :", writecode )
            
            writecode.write(codeArea)
            
            // console.log(req.body)
            
            writecode.on('error', error =>{
            // console.log("error is :",error.message);
                return next(error.message);
            })

             const compiler =  spawn(`g++`, [cppFilePath,'-o', cppExeFile])
                compiler.stdout.on('data', (data) => {
                    // console.log(`stdout: ${data}`);
                });
                compiler.stderr.on('data', (data) => {
                    // console.log(`compile-stderr: ${String(data)}`);
                     const updatedError = String(data).split(cppFilePath).join('');
                     return next(updatedError);
                    // callback('1', String(data)); // 1, compile error
                });
                compiler.on('close', (data) => {
                    if (data === 0) {
                        execute(cppExeFile);
                    }
                });
            async function execute(cppExeFile) {
            const { stdout, stderr } = await exec_async(cppExeFile);
                
                if(stdout){
                    console.log('stdout:', stdout);
                    res.status(200)
                    res.send(stdout)
                }
                if(stderr){
                     console.error('stderr:', stderr);
                    res.status(200)
                    res.send(stderr)
                }
               
            }
    //    let stdout = fileToExe(cppExeFile,cppFilePath, runExe(cppExeFile+'.exe'))
            // exec(`g++ ${cppFilePath} -o ${cppExeFile} ` ,
            //  const {(error, stdout, stderr} = 
            //     if (error) {
            //         console.log(`error: ${error.message}`);
            //         return;
            //     }
            //     if (stderr) {
            //         console.log(`stderr: ${stderr}`);
            //         return;
            //     }
            // })

            // exec(`${cppExeFile}`, (error, stdout, stderr) => {
            //     if (error) {
            //         console.log(`error: ${error.message}`);
            //         return;
            //     }
            //     if (stderr) {
            //         console.log(`stderr: ${stderr}`);
            //         return;
            //     }
            //     // console.log(`stdout: ${stdout}`);
                
            //     // return stdout;
            //     res.status(200)
            //     res.send(stdout);
            
            // })
        // let exe_file = path.resolve(code_dir, c_exe_file)
        // console.log("c_exe_file 2:",cppExeFile)
        // let stdout = runExe(cppExeFile)
        // stdout= runExe(cppExeFile+'.exe')
        // res.status(200)
        // res.send(stdout);
    }
    catch(error){
       next( new Error(error.message))
    }
    

        
    
}

// const fileToExe = (cppExeFile,cppFilePath,runExe) => {
//      exec(`g++ ${cppFilePath} -o ${cppExeFile} ` , (error, stdout, stderr) => {
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         }
//     })
//     return runExe;
// }

// const runExe =  (cppExeFile) => {
//         exec(`${cppExeFile}`, (error, stdout, stderr) => {
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
    cpp_execute
}