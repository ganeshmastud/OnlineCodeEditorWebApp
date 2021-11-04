const express = require( 'express' );
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const router = express.Router();
const fs = require('fs');
const path = require('path');

const downloadCode = (req,res,next) => {
    
    let codeFilePath = req.body.codeFilePath

    if(req.body.language==='java'){
        codeFilePath = codeFilePath.replace('\\','\\\\')
      
        let filename = codeFilePath.split("\\");
        let foldername = filename[filename.length-1]
        // console.log(foldername)
        codeFilePath = path.join(req.body.codeFilePath,foldername+'.java')
        
    }
    // console.log("code ",codeFilePath);
    res.download(codeFilePath, function(error){
        console.log("Error : ", error)
        next(error)
    });
    
}

router.post('/',downloadCode)


module.exports = router;