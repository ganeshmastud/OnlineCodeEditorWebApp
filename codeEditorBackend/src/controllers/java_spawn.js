require( '../data/init' );
writeToFileFn = require('./helpful_functions/writeToFile')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { spawn,exec } = require("child_process");
const fs = require('fs');
const path = require('path')
const mongoose = require( 'mongoose' );
const User = mongoose.model('User')
const nanoid = require('nanoid')

const  fspromises = require('fs/promises');
const { nextTick } = require('process');

const util = require('util');
const exec_java_file = util.promisify(require('child_process').exec);


const java_execute = async (req,res,next) =>{

    try{
        console.log("you are in java exec flie in controller");
        
        
        let promise =  new Promise(function(Resolve, Reject) {
            // console.log("in promise");
            if(!req.body){
                const error = new Error( 'no data received in request' );
                error.status = 404;
                Reject( error );
            } else{
                 Resolve( req.body); // when successful
            }

       
        });


        await promise.then( async (req_body) =>{
            const {userId,select_language,codearea } = req_body;
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
            const filter = {"_id" : userId}
            let code_for_lang_present=false;
            const code_dir = 'CodeFiles/java';

            let javafilepath = '';
            let java_exe_file = '';
            let java_file_dir = '';
            const if_filepath_exist_in_db = await User.find(filter)
            // console.log("if_filepath_exist_in_db ",if_filepath_exist_in_db[0])
        
            if(if_filepath_exist_in_db[0].codeFiles.length>0){
                if_filepath_exist_in_db[0].codeFiles.forEach(code_file =>{
                    // console.log("code_file ", code_file)
                    if(code_file.language === select_language){
                        code_for_lang_present=true;
                        java_file_dir = code_file.filepath
                        // console.log("file path exist")
                        // paths_obj={
                        //     java_file_dir,
                        //     java_exe_file,
                        //     javafilepath
                        // }
                        return;
                    }
                } )
            }
       
            return await get_java_paths(code_dir,select_language,filter,codearea,code_for_lang_present, 
                java_file_dir, javafilepath, java_exe_file);
        })   
        .then( async (paths_obj) =>{
               
                await writeToFileFn.writeToFileFn(paths_obj.javafilepath,paths_obj.codearea);
                // let is_complete = await  continue next line here after removing commit
                //  fileToExe(paths_obj.javafilepath)
                paths_obj.codearea=''
                
                function fileToExe(paths_obj) {
                    console.log("in filetoExe",paths_obj.javafilepath);
                    const compiler = spawn(`javac`, [paths_obj.javafilepath])
                        compiler.stdout.on('data', (data) => {
                            console.log(`stdout: ${data}`);
                        });
                        compiler.stderr.on('data', (data) => {
                            console.log(`compile-stderr: ${String(data)}`);
                            // callback('1', String(data)); // 1, compile error
                        });
                        compiler.on('close', (data) => {
                            if (data === 0) {
                            /*if the function file to exe not present in the promise then remove comment
                             from below line and refrence the const obj with run exe output */ 
                            //const {stdout,stderr} = await 
                            runExe(paths_obj.java_file_dir, paths_obj.java_exe_file)
                            }
                        });
                        // console.log("in filetoexe o/p :",stdout,stderr)
                        // return {stdout,stderr}

                    
                }

                //compilig java file

                fileToExe(paths_obj)
                    
                //executing java file
                async function runExe(java_file_dir, java_exe_file){
                    console.log("in run exe ",java_exe_file)
                    java_exe_file = java_exe_file.split('.')[0]
                    // console.log("java_exe_file ",java_exe_file)
                    const {stdout,stderr} = await exec_java_file(`java -cp ${java_file_dir}; ${java_exe_file}`);
                    console.log("in runExe",stdout, stderr)
                    if(stderr){
                        console.error('stderr:', stderr);
                        return next(stderr);
                    }
                        if(stdout){
                        console.log('stdout:', stdout);
                        res.status(200);
                        res.send(stdout);
                    }
                 /*if the function runExe not present in the promise then remove comment
                             from below line and return  the obj to file to exe and run if else for it in promise*/ 
                //return {stdout,stderr} 
                    
                }
                    // java_exe_file = java_exe_file.split('.')[0]
                
            
            
               
                
                
        })
        .catch(err=>{
            console.log("promise rejectd");
            console.log("err :",err, err.message)
            next(err.message);
        })
        
        
        
       
        
    }
    catch(error){
        console.error("main try catch error");
        next(error.message)
    }
        
    
}


   async function get_java_paths(code_dir,select_language,filter, codearea,
    code_for_lang_present, java_file_dir, javafilepath, java_exe_file){
        // console.log("in get_jav_paths  ")

        let exefile='';
        let filepath='';
        if(!code_for_lang_present){
        
        
            const id = nanoid(5)
            const java_path = 'java'+id+'.java'
            java_file_dir = path.resolve(code_dir, 'java'+id)
            exefile = 'Simple'//path.resolve(java_file_dir,'java'+id)
            filepath =  path.resolve(java_file_dir, java_path)  //important when trying to access the pat using path.jion error was thrown
            // console.log("path resolve :",pyfilepath);
            let update = {language:select_language, filepath:java_file_dir};
            // console.log("update ",update)
            let doc = await User.findOneAndUpdate(filter, {$push:{ codeFiles:{$each:[update]} }}, {
                returnOriginal: false
            })

            try {
            
                    await fspromises.mkdir(path.resolve('CodeFiles/java', java_file_dir));
                    
            } catch (err) {
                const err_msg ="Failed to create a directory"
                console.error(err_msg);
                next(err_msg)
            }
            
            // console.log("doc ",doc);
            // return {java_file_dir,javafilepath,java_exe_file}
        } else{
           let paths = await read_directory(java_file_dir);
        //    console.log("paths ret ",paths);
           filepath = paths[0];
           exefile = paths[1];
                    
        }
        // console.log("java_file_dir,javafilepath,java_exe_file ",java_file_dir,filepath ,exefile)
        javafilepath= filepath;
        java_exe_file = exefile;
        // console.log("codearea ",codearea);
        return {java_file_dir,javafilepath,java_exe_file, codearea};
    }

    async function read_directory(java_file_dir){
        let filename ='';
        let classfile='';
        try {
            
            const files = await fspromises.readdir(java_file_dir);
            filename = files[0];
            classfile = files[1];
        } catch (err) {
            const err_msg ='Failed to read a java file directory'
            console.error(err_msg);
            next(err_msg)
        }
       
        return [path.resolve(java_file_dir, filename), classfile]
    }
        

  





module.exports = {
    java_execute
}