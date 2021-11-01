const fs = require('fs');
async function writeToFileFn(javafilepath, codearea){
    // console.log("in write to file fn");
    // console.log("in Write To file fn", javafilepath, codearea );
    let writecode =  fs.createWriteStream( javafilepath); //,{flags:'a'} flag is set if tryies to append file
    // console.log("write code :", writecode )
    
   await writecode.write(codearea)
    
    // console.log(req.body)
    
    writecode.on('error', error =>{
    console.log("error is :",error.message);
    })
    return;
}  

module.exports = {
    writeToFileFn
} 