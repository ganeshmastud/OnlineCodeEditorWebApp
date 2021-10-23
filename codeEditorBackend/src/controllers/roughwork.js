console.log("cool")
const path = require('path')
console.log("path :",path.join('../CodeFiles', 'dummy.py'))
const fs = require('fs')
const { exec } = require("child_process");
const py =path.join('../CodeFiles', 'dummy.py')
console.log("normalize :",path.normalize('./CodeFiles'))

const c = path.resolve('CodeFiles', 'dummy.py')
console.log("path resolve :",c);

exec(`python ${py}`,(err,stdout,stderr)=>{
    if (err) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    
})

