const mongoose = require( 'mongoose' );
const User = mongoose.model('User')
// console.log("in updateUserCodingLanguage");
const updateUserCodingLanguage = async (req,res,next) => {
    // console.log("in updateUserCodingLanguage",req.params.id, req.query);
 
    const id =req.params.id; 
    const language =req.query;
    console.log("lang ",language);
    await User.findByIdAndUpdate(id,language)
    .then( result => {
        // console.log("result ",result)
        const language =result.language;

        // console.log("in updateUserCodingLanguage",language);
        res.status(200);
        res.send({language});
    })
    .catch(err=>{
        return next(err);
    })
}

module.exports = {
    updateUserCodingLanguage
}