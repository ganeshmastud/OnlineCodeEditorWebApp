const mongoose = require( 'mongoose' );
const User = mongoose.model('User')

const updateUserEditorTheme = async (req,res,next) => {
    console.log("in updateUserEditorTheme",req.params,req.query);
    const id =req.params.id;
    const theme =req.query;
    await User.findByIdAndUpdate(id,theme)
    .then( result => {
        res.status(200);
        res.send(result);
    })
    .catch(err=>{
        return next(err);
    })
}

module.exports = {
    updateUserEditorTheme
}