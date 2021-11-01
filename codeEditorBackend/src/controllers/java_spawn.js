require( '../data/init' );
writeToFileFn = require('./common_utils/write_to_file')
codeInputValidation =require('./common_utils/code_input_validation')
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
        // console.log("you are in java exec flie in controller");
        
        
        let promise =  new Promise(function(resolve, reject) {
            // console.log("in promise");
            if(!req.body){
                const error = new Error( 'no data received in request' );
                error.status = 404;
                reject( error );
            } else{
                 resolve( req.body); // when successful
            }

       
        });


        await promise.then( async (req_body) => {
            // console.log(req_body)
            const {userId,select_language,codearea } = req_body;
            const selectLanguage = select_language;
            const codeArea =codearea;
            // console.log("typeof codeInputValidation",typeof codeInputValidation, codeInputValidation);
            // console.log("data ",selectLanguage,codeArea)
            const codeInputValidationErr= await codeInputValidation.codeInputValidation(userId,selectLanguage,codeArea)
            if(codeInputValidationErr){
                next(codeInputValidationErr)
            }
            const filter = {"_id" : userId}
            let codeForLangPresent=false;
            const codeDir = 'CodeFiles/java';

            let javaFilePath = '';
            let javaExeFile = '';
            let javaFileDir = '';
            const ifFilepathExistInDb = await User.find(filter)
            // console.log("ifFilepathExistInDb ",ifFilepathExistInDb[0])
        
            if(ifFilepathExistInDb[0].codeFiles.length>0){
                ifFilepathExistInDb[0].codeFiles.forEach(codeFile =>{
                    // console.log("codeFile ", codeFile)
                    if(codeFile.language === selectLanguage){
                        codeForLangPresent=true;
                        javaFileDir = codeFile.filepath
                        // console.log("file path exist")
                        // pathsObj={
                        //     javaFileDir,
                        //     javaExeFile,
                        //     javaFilePath
                        // }
                        return;
                    }
                } )
            }
       
            return await getJavaPaths(codeDir,selectLanguage,filter,codeArea,codeForLangPresent, 
                javaFileDir, javaFilePath, javaExeFile);
        })   
        .then( async (pathsObj) =>{
               
                await writeToFileFn.writeToFileFn(pathsObj.javaFilePath,pathsObj.codeArea);
                // let is_complete = await  continue next line here after removing commit
                //  fileToExe(pathsObj.javaFilePath)
                pathsObj.codeArea=''
                
                function fileToExe(pathsObj) {
                    console.log("in filetoExe",pathsObj.javaFilePath);
                    const compiler = spawn(`javac`, [pathsObj.javaFilePath])
                        compiler.stdout.on('data', (data) => {
                            console.log(`stdout: ${data}`);
                        });
                        compiler.stderr.on('data', (data) => {
                            console.log(`compile-stderr: ${String(data)}`);
                            const updatedError = String(data).split(pathsObj.javaFilePath).join('');
                            return next('Line '+updatedError);
                            // callback('1', String(data)); // 1, compile error
                        });
                        compiler.on('close', (data) => {
                            if (data === 0) {
                            /*if the function file to exe not present in the promise then remove comment
                             from below line and refrence the const obj with run exe output */ 
                            //const {stdout,stderr} = await 
                               runExe(pathsObj.javaFileDir, pathsObj.javaExeFile)
                            }
                        });
                        // console.log("in filetoexe o/p :",stdout,stderr)
                        // return {stdout,stderr}

                    
                }

                //compilig java file
                fileToExe(pathsObj)
                    
                //executing java file
                async function runExe(javaFileDir, javaExeFile){

                    console.log("in run exe ",javaExeFile)
                    javaExeFile = javaExeFile.split('.')[0]
                    // console.log("javaExeFile ",javaExeFile)
                    const {stdout,stderr} = await exec_java_file(`java -cp ${javaFileDir}; ${javaExeFile}`);
                    console.log("in runExe",stdout, stderr)
                    if(stderr){
                        console.error('stderr:', stderr);
                         const updatedError = stderr.split(javaExeFile).join('');
                        return next(updatedError);
                        // return next(stderr);
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
                    // javaExeFile = javaExeFile.split('.')[0]
                
            
            
               
                
                
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


   async function getJavaPaths(codeDir,selectLanguage,filter, codeArea,
    codeForLangPresent, javaFileDir, javaFilePath, javaExeFile){
        // console.log("in get_jav_paths  ")

        let exefile='';
        let filepath='';
        if(!codeForLangPresent){
        
        
            const id = nanoid(5)
            const java_path = 'java'+id+'.java'
            javaFileDir = path.resolve(codeDir, 'java'+id)
            exefile = 'Simple'//path.resolve(javaFileDir,'java'+id)
            filepath =  path.resolve(javaFileDir, java_path)  //important when trying to access the pat using path.jion error was thrown
            // console.log("path resolve :",pyfilepath);
            let update = {language:selectLanguage, filepath:javaFileDir};
            // console.log("update ",update)
            let doc = await User.findOneAndUpdate(filter, {$push:{ codeFiles:{$each:[update]} }}, {
                returnOriginal: false
            })

            try {
            
                    await fspromises.mkdir(path.resolve('CodeFiles/java', javaFileDir));
                    
            } catch (err) {
                const err_msg ="Failed to create a directory"
                console.error(err_msg);
                next(err_msg)
            }
            
            // console.log("doc ",doc);
            // return {javaFileDir,javaFilePath,javaExeFile}
        } else{
           let paths = await readDirectory(javaFileDir);
        //    console.log("paths ret ",paths);
           filepath = paths[0];
           exefile = paths[1];
                    
        }
        // console.log("javaFileDir,javaFilePath,javaExeFile ",javaFileDir,filepath ,exefile)
        javaFilePath= filepath;
        javaExeFile = exefile;
        // console.log("javaExeFile ",javaExeFile);
        // console.log("codeArea ",codeArea);
        return {javaFileDir,javaFilePath,javaExeFile, codeArea};
    }

    async function readDirectory(javaFileDir){
        let filename ='';
        let classfile='';
        try {
            
            const files = await fspromises.readdir(javaFileDir);
            filename = files[0];
            classfile = files[1];
        } catch (err) {
            const err_msg ='Failed to read a java file directory'
            console.error(err_msg);
            next(err_msg)
        }
       
        return [path.resolve(javaFileDir, filename), classfile]
    }
        

  





module.exports = {
    java_execute
}