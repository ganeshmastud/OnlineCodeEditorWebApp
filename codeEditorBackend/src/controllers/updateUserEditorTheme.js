const mongoose = require( 'mongoose' );
const User = mongoose.model('User')

const updateUserEditorTheme = async (req,res,next) => {
   
    const id =req.params.id;
    const theme =req.query;
    await User.findByIdAndUpdate(id,theme)
    .then( result => {
        const theme =result.theme;
        // console.log("in updateUserEditorTheme",theme);
        res.status(200);
        res.send({theme});
    })
    .catch(err=>{
        return next(err);
    })
}

module.exports = {
    updateUserEditorTheme
}