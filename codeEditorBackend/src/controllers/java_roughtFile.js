require( '../data/init' );
writeToFileFn = require('./helpful_functions/writeToFile')
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

const  fspromises = require('fs/promises');
const { nextTick } = require('process');

const java_execute = async (req,res,next) =>{

    try{
        console.log("you are in java exec flie in controller");
        
        
      
        if(!req.body){
            const error = new Error( 'no data received in request' );
            error.status = 404;
            Reject( error );
        } else{
                Resolve( req.body); // when successful
        }

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
        const code_dir = 'src/CodeFiles/java';

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
    
            // return get_java_paths(code_dir,select_language,filter,codearea,code_for_lang_present, 
            //     java_file_dir, javafilepath, java_exe_file);
  
                
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
           
                console.log("trying to compile first")
                try {  
                        await fspromises.mkdir(path.resolve('CodeFiles/java', java_file_dir));
                        
                } catch (err) {
                    console.error(err);
                }
                
                // console.log("doc ",doc);
                // return {java_file_dir,javafilepath,java_exe_file}
            } else{
            let paths = await read_directory(java_file_dir);
            filepath = paths[0];
            exefile = paths[1];
                        
            }
             javafilepath= filepath;
             java_exe_file = exefile;



                
                await writeToFileFn.writeToFileFn(paths_obj.javafilepath,paths_obj.codearea);
                let is_complete =  fileToExe(paths_obj.javafilepath)
                let stdout='';
            
                     stdout = runExe(paths_obj.java_file_dir ,paths_obj.java_exe_file) 
                
                
                res.status(200)
                res.send(stdout);
       
            next(err.message);
       
        

        
    
}


    async function read_directory(java_file_dir){
        let filename ='';
        let classfile='';
        try {
            
            const files = await fspromises.readdir(java_file_dir);
            filename = files[0];
            classfile = files[1];
        } catch (err) {
            console.error(err);
        }
        //  fs.readdir(path.resolve(java_file_dir), function(err, files) {

        //         if (err) {
        //             return console.error(err);
        //         }
        //         // console.log("files[0] ", files[0]);
        //         //  =  path.resolve(java_file_dir, files[0])
        //         // = files[1]; //path.resolve( java_file_dir ,

        //         // console.l og("javafilepath ",javafilepath, "java_exe_file ",java_exe_file)
        //         // console.log("files[1] ", files[1]);
        //          this.classfile = files[1];
        //          this.filename = files[0];
        //         this.arr.append(files[0]);
        //          this.arr.append(files[1]);
        //         // return [files[0], files[1]]
        //         return;
        //     })
            
            // classfile = java_files[1];
            // filename = java_files[0];
            // console.log("fcs ",filename, classfile)
            return [path.resolve(java_file_dir, filename), classfile]
    }
        // 

  function fileToExe(javafilepath) {
    console.log("in fileToexe ",javafilepath)
     function execute_java_file(){
        exec(`javac ${javafilepath}` , (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return next(error.message);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return next(stderr);
            }
        })
    }
    execute_java_file();
    return true;
}

function runExe(java_file_dir, java_exe_file){
        console.log("in run exe ",java_exe_file)
        java_exe_file = java_exe_file.split('.')[0]
        // console.log("java_exe_file ",java_exe_file)
        exec(`java -cp ${java_file_dir}; ${java_exe_file}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return next(error.message);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return next(stderr);
        }
        console.log(`stdout: ${stdout}`);
        
        return stdout;
     
    })
}



module.exports = {
    java_execute
}