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
        console.log("you are in cpp exec flie in controller");
        if(!req.body){
            const error = new Error( 'no data received in request' );
            error.status = 404;
            return next( error );
        } 
        const {userId,select_language,codearea }= req.body; 
        
        if(userId === undefined || userId.length <= 0 || userId === null){
        const error = new Error("Please provide the right userId")
        return next (error)
    }
    if(select_language === undefined || select_language === null){
        const error = new Error("Please provide the right language details")
        return next (error)
    }
    if(codearea === undefined || codearea === null || codearea.length <=0){
        
        const error = new Error("Please provide some code to run")
        error.status = 204;
        return next (error)
    }
        
        
            // console.log("path :",__dirname)
        
        // const pyfilepath=path.join(code_dir, 'dummy.py')
        // console.log("userId ",userId)
        const filter = {"_id" : userId}
        let code_for_lang_present=false;
        const code_dir = 'CodeFiles/cpp';

        let cppfilepath =''
        const if_filepath_exist_in_db = await User.find(filter)
        // console.log("if_filepath_exist_in_db ",if_filepath_exist_in_db)
        let cpp_exe_file = ''
        if(if_filepath_exist_in_db[0].codeFiles.length>0){
            if_filepath_exist_in_db[0].codeFiles.forEach(code_file =>{
                // console.log("code_file ", code_file)
                if(code_file.language === select_language){
                    code_for_lang_present=true;
                    cppfilepath = code_file.filepath;
                    cpp_exe_file =code_file.filepath;
                    // console.log("c_exe_file ",c_exe_file);
                    cpp_exe_file =cpp_exe_file.slice(0,-4)
                    // console.log("file path exist")
                    return;
                }
            } )
        }
        
        // console.log("if_filepath_exist_in_db ",if_filepath_exist_in_db[0].codeFiles);

        if(!code_for_lang_present){


            
            const id = nanoid(5)
            const cpp_path = 'cpp'+id+'.cpp'
            cpp_exe_file = path.resolve(code_dir,'cpp'+id)
            cppfilepath = path.resolve(code_dir, cpp_path)  //important when trying to access the path using path.join error was thrown
            // console.log("path resolve :",pyfilepath);
            console.log("cppfilepath ",cppfilepath)
            let update = {language:select_language, filepath:cppfilepath};
            // console.log("update ",update)
            let doc = await User.findOneAndUpdate(filter, {$push:{ codeFiles:{$each:[update]} }}, {
                returnOriginal: false
            })
            // console.log("doc ",doc);
        }
        
        let writecode =  fs.createWriteStream( cppfilepath) //,{flags:'a'} flag is set if tryies to append file
            // console.log("write code :", writecode )
            
            writecode.write(req.body.codearea)
            
            // console.log(req.body)
            
            writecode.on('error', error =>{
            console.log("error is :",error.message);
                return next(error.message);
            })

             const compiler =  spawn(`g++`, [cppfilepath,'-o', cpp_exe_file])
                compiler.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });
                compiler.stderr.on('data', (data) => {
                    console.log(`compile-stderr: ${String(data)}`);
                    // callback('1', String(data)); // 1, compile error
                });
                compiler.on('close', (data) => {
                    if (data === 0) {
                        execute(cpp_exe_file);
                    }
                });
            async function execute(cpp_exe_file) {
            const { stdout, stderr } = await exec_async(cpp_exe_file);
                
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
    //    let stdout = fileToExe(cpp_exe_file,cppfilepath, runExe(cpp_exe_file+'.exe'))
            // exec(`g++ ${cppfilepath} -o ${cpp_exe_file} ` ,
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

            // exec(`${cpp_exe_file}`, (error, stdout, stderr) => {
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
        // console.log("c_exe_file 2:",cpp_exe_file)
        // let stdout = runExe(cpp_exe_file)
        // stdout= runExe(cpp_exe_file+'.exe')
        // res.status(200)
        // res.send(stdout);
    }
    catch(error){
       next( new Error(error.message))
    }
    

        
    
}

// const fileToExe = (cpp_exe_file,cppfilepath,runExe) => {
//      exec(`g++ ${cppfilepath} -o ${cpp_exe_file} ` , (error, stdout, stderr) => {
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

// const runExe =  (cpp_exe_file) => {
//         exec(`${cpp_exe_file}`, (error, stdout, stderr) => {
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