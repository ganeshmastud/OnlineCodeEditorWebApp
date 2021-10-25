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

const  fspromises = require('fs/promises')
console.log("readdir ", fspromises.readdir)
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
       
        return get_java_paths(code_dir,codearea,code_for_lang_present, java_file_dir, javafilepath, java_exe_file);
        })   
        .then( async (paths_obj) =>{
                // console.log(paths_obj);
                // console.log("got here",paths_obj.javafilepath,paths_obj.codearea)
                // console.log("writeToFileFn ", writeToFileFn.writeToFileFn)
                await writeToFileFn.writeToFileFn(paths_obj.javafilepath,paths_obj.codearea);
                let is_complete = await fileToExe(paths_obj.javafilepath)
                let stdout='';
                // if(is_complete){
                     stdout = await runExe(paths_obj.java_file_dir ,paths_obj.java_exe_file) 
                // }
                
                res.status(200)
                res.send(stdout);
        })
        .catch(err=>{
            console.log(err.message);
        })
        // console.log("path :",__dirname)
        
        // const pyfilepath=path.join(code_dir, 'dummy.py')
        // console.log("userId ",userId)
        
        
       
        // console.log("if_filepath_exist_in_db ",if_filepath_exist_in_db[0].codeFiles);
        // const paths_obj = get_java_paths(code_for_lang_present, java_file_dir, javafilepath, java_exe_file);
        // java_file_dir = paths_obj.java_file_dir;
        // javafilepath = paths_obj.javafilepath;
        // java_exe_file = paths_obj.java_exe_file;
        // console.log("paths_obj", paths_obj)
        // console.log("writeToFileFn ",typeof writeToFileFn, writeToFileFn, javafilepath);
        // writeToFileFn(javafilepath)

        // console.log("javafilepath ",javafilepath)
        // let stdout = fileToExe(javafilepath, runExe(java_file_dir ,java_exe_file)) 
        /*we don't req java_exe_file path here and 
        for runExe we require director path not java class file path*/

        // let exe_file = path.resolve(code_dir, c_exe_file)
        // console.log("c_exe_file 2:",cpp_exe_file)
        // let stdout = runExe(cpp_exe_file)
        // stdout= runExe(cpp_exe_file+'.exe')
        // res.status(200)
        // res.send(stdout);
    }
    catch(error){
        console.log(error.message)
    }
        
    
}


   async function get_java_paths(code_dir, codearea,code_for_lang_present, java_file_dir, javafilepath, java_exe_file){
        // console.log("in get_jav_paths  ")

        let exefile='';
        let filepath='';
        if(!code_for_lang_present){
        
        
            const id = nanoid(5)
            const java_path = 'java'+id+'.java'
            java_file_dir =  path.resolve(code_dir, 'java'+id)
            exefile = 'Simple'//path.resolve(java_file_dir,'java'+id)
            filepath =  path.resolve(java_file_dir, java_path)  //important when trying to access the pat using path.jion error was thrown
            // console.log("path resolve :",pyfilepath);
            fs.mkdir(path.resolve('CodeFiles/java', java_file_dir), (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory created successfully!');
            });

            let update = {language:select_language, filepath:java_file_dir};
            // console.log("update ",update)
            let doc = User.findOneAndUpdate(filter, {$push:{ codeFiles:{$each:[update]} }}, {
                returnOriginal: false
            })
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
        

  function fileToExe(javafilepath) {
    console.log("in fileToexe ",javafilepath)
     function execute_java_file(){
        exec(`javac ${javafilepath}` , (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
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
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        
        return stdout;
     
    })
}



module.exports = {
    java_execute
}