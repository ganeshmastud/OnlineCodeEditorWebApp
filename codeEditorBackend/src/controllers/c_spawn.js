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

    console.log("you are in c exec flie in controller");
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
    const filter = {"_id" : userId}
    let code_for_lang_present=false;
    const code_dir = 'CodeFiles/c';
    let cfilepath =''
    const if_filepath_exist_in_db = await User.find(filter)
    let c_exe_file = ''
    if(if_filepath_exist_in_db[0].codeFiles.length>0){
        if_filepath_exist_in_db[0].codeFiles.forEach(code_file =>{
            // console.log("code_file ", code_file)
            if(code_file.language === select_language){
                code_for_lang_present=true;
                cfilepath = code_file.filepath;
                c_exe_file =code_file.filepath;
                console.log("c_exe_file ",c_exe_file);
                c_exe_file =c_exe_file.slice(0,-2)
                console.log("file path exist")
                return;
            }
        } )
    }
    
    // console.log("if_filepath_exist_in_db ",if_filepath_exist_in_db[0].codeFiles);

    if(!code_for_lang_present){


        
        const id = nanoid(5)
        const c_path = 'c'+id+'.c'
        c_exe_file = path.resolve(code_dir,'c'+id)
        cfilepath =  path.resolve(code_dir, c_path)  //important when trying to access the pat using path.jion error was thrown
        // console.log("path resolve :",pyfilepath);

        let update = {language:select_language, filepath:cfilepath};
        console.log("update ",update)
        let doc = await User.findOneAndUpdate(filter, {$push:{ codeFiles:{$each:[update]} }}, {
            returnOriginal: false
        })
        // console.log("doc ",doc);
    }
    
    let writecode =  fs.createWriteStream( cfilepath) //,{flags:'a'} flag is set if tryies to append file
        // console.log("write code :", writecode )
        
        writecode.write(req.body.codearea)
        
        // console.log(req.body)
        
        writecode.on('error', error =>{
        console.log("error is :",error.message);
        next(error.message)
        return;
        })
        writecode.close();
    // fileToExe(c_exe_file,cfilepath)
   const compiler =  spawn(`gcc`, [cfilepath,'-o', c_exe_file])
        compiler.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.send(data)
        });
        compiler.stderr.on('data', (data) => {
        console.log(`compile-stderr: ${String(data)}`);
        // return next(data)
        const error = new Error(String(data).split('.')[1]);
        return next(error);
        // callback('1', String(data)); // 1, compile error
        });
        compiler.on('close', (data) => {
        if (data === 0) {
            execute(c_exe_file);
        }
        });
    

    // let exe_file = path.resolve(code_dir, c_exe_file)
    console.log("c_exe_file 2:",c_exe_file)
    async function execute(c_exe_file) {
        const { stdout, stderr } = await exec_async(c_exe_file);
            console.log('stdout:', stdout);
            if(stdout){
                res.status(200)
                res.send(stdout)
            }
            if(stderr){
                console.error('stderr:', stderr);
                next(stderr)
            }
            // console.error('stderr:', stderr);
        }
    // function execute(c_exe_file){
    //     const executor = spawn(c_exe_file, [],[]);
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
    
    
    // let stdout = runExe(c_exe_file)
    
    
        
}
// const fileToExe = (c_exe_file,cfilepath) => {
//      exec(`gcc -o ${c_exe_file} ${cfilepath}` , (error, stdout, stderr) => {
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

// function runExe(c_exe_file){
//         exec(`${c_exe_file}`, (error, stdout, stderr) => {
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