const express = require( 'express' );
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const router = express.Router();
const fs = require('fs');
const path = require('path')
const loadCode = (req,res,next) => {
    // console.log("req ",req.body.codeFilePath);
    // fs.createReadStream(req.body.codeFilePath)
    let codeFilePath = req.body.codeFilePath
    let data ='';
    if(req.body.language==='java'){
        codeFilePath = codeFilePath.replace('\\','\\\\')
        console.log(codeFilePath)
        let filename = codeFilePath.split("\\");
        let foldername = filename[filename.length-1]
        codeFilePath = path.join(req.body.codeFilePath,foldername+'.java')
    }
    console.log(codeFilePath)
    const readStream = fs.createReadStream(codeFilePath)
    readStream.setEncoding("UTF8");

    readStream.on("data", (chunk) => {
        data += chunk;
    });

    readStream.on("end", () => {
        // console.log(data);
        res.status(200)
        res.send(data);
    });

    readStream.on("error", (error) => {
        // console.log(error.stack);
        console.log("cant fetch file")
        return next(error)
    });
    
}

router.post('/',loadCode)


module.exports = router;