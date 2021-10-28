console.log("cool")
const path = require('path')
console.log("path :",path.join('../CodeFiles', 'dummy.py'))
const fs = require('fs')
const { exec } = require("child_process");
const py =path.join('../CodeFiles', 'dummy.py')
console.log("normalize :",path.normalize('./CodeFiles'))


//remove codefiles  command
//db.users.update({_id:ObjectId("6179a145bb9b5e6f3d25164c")},{$pull:{"codeFiles":{language:"cpp"}}})  



// const c = path.resolve('CodeFiles', 'dummy.py')
// console.log("path resolve :",c);

// exec(`python ${py}`,(err,stdout,stderr)=>{
//     if (err) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
    
// })
const nanoid = require('nanoid')
const id = nanoid(5)

// console.log("id :", id);


//  fs.access("../CodeFiles/python", err=>{
//         if(err){
//             // console.log("dir does not exist")
//             const error = new Error( 'dir does not exist' );
//             error.status = 404;
//             return next( error );

//         } else{
//             console.log("dir exists")
           
//         }
//     })
    // const code_dir = '../CodeFiles/c';
    // let cfilepath = path.resolve(code_dir, 'cm_zj3.c')
    // let exe_file = path.resolve( '../CodeFiles/c', 'cx441u')
    // console.log("exe_file ",exe_file)
    // exec(`gcc -o ${exe_file} ${cfilepath}` , 
    // (error, stdout, stderr) => {
    // if (error) {
    //     console.log(`error: ${error.message}`);
    //     return;
    // }
    // if (stderr) {
    //     console.log(`stderr: ${stderr}`);
    //     return;
    // }

    // })


let exe_file = path.resolve(__dirname, 'rough.py')

console.log("Exe ",exe_file)
    exec( `python ${exe_file}` , (error,stdin, stdout, stderr) => {
    if (error) {
        console.log(`error to execute: ${error.message}`);
        return;
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    stdin.write("coolest")
    return;
     
    })
    // fs.mkdir(path.resolve('../CodeFiles/java', 'test'), (err) => {
    //     if (err) {
    //         return console.error(err);
    //     }
    //     console.log('Directory created successfully!');
    // });

    // fs.readdir(path.resolve('../CodeFiles/java/javamMUzK'), (err,files)=>{

    //     if (err) {
    //         return console.error(err);
    //     }
    //     files.forEach(function (file) {
    //         // Do whatever you want to do with the file
    //         console.log(file); 
    //     });
    // })