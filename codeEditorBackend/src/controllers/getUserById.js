const mongoose = require( 'mongoose' );
const User = mongoose.model('User')

const getUserById = async (req,res,next) =>{
    // console.log("in getUserById ",req.params.id)
    const id =req.params.id;
   
     const filter = {"_id" : id} 
     await User.findOne(filter)
     .then( (result) =>{
        //  console.log(result)
        res.status(200);
        res.send(result)
     })
     .catch( err =>{
         return next(err)
     })
    // console.log(userDetails)
    // res.send(userDetails)
    
}

module.exports = {
    getUserById
}