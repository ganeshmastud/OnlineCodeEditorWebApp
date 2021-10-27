const e = require("express")

const request_data_code_size = (req,res,next) =>{
    // console.log("in request_data_code_size ",req.body.codearea.length);
    console.log("req.socket.bytesRead ",(req.socket.bytesRead/1000) )
    if((req.socket.bytesRead/1000)>100){
        const error = new Error("code size should be less than 100kb")
        return next(error)
    }
    
   return next();
}
module.exports = {
    request_data_code_size
};