console.log("cool")
const path = require('path')
console.log("path :",path.join('../CodeFiles', 'dummy.py'))
const fs = require('fs')
const { exec } = require("child_process");
const py =path.join('../CodeFiles', 'dummy.py')
console.log("normalize :",path.normalize('./CodeFiles'))

const c = path.resolve('CodeFiles', 'dummy.py')
console.log("path resolve :",c);

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
    const code_dir = '../CodeFiles/c';
    let cfilepath = path.resolve(code_dir, 'cm_zj3.c')
    let exe_file = path.resolve( '../CodeFiles/c', 'cx441u')
    console.log("exe_file ",exe_file)
    exec(`gcc -o ${exe_file} ${cfilepath}` , 
    (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    })



console.log("Exe ",exe_file)
    exec( `${exe_file}` , (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    return;
     
    })
    