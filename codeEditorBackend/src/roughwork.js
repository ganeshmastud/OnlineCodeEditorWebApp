console.log("cool")
const path = require('path')
console.log("path :",path.join(path.normalize('./CodeFiles'), 'dummy.py'))
const fs = require('fs')
const { exec } = require("child_process");
// const py =path.join(path.normalize('./CodeFiles'), 'dummy.py')
// console.log("normalize :",path.normalize('./CodeFiles'))
 const filename = '\arwerwr\\fsfs\\dfsdfsd\\fdsfsd\\dfdsfdsfdsfg'.split('\\');
 console.log(filename[filename.length-1]);
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

// const x ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnJ1Y2Ugd2F5biIsImVtYWlsIjoiYmF0bWFuQGdtYWlsLmNvbSIsImlhdCI6MTYzNTc1MzExNiwiZXhwIjoxNjM1ODM5NTE2fQ.jb9_CeBF6DF8CCTqYV7F4PZ9B37ia4BWngMlfLCjNx4'
// const y = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnJ1Y2Ugd2F5biIsImVtYWlsIjoiYmF0bWFuQGdtYWlsLmNvbSIsImlhdCI6MTYzNTc1MzExNiwiZXhwIjoxNjM1ODM5NTE2fQ.jb9_CeBF6DF8CCTqYV7F4PZ9B37ia4BWngMlfLCjNx4'
// if(x===y){
//     console.log("same")
// }

