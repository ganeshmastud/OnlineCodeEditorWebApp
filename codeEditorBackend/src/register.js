
require( './data/init' );



const result = new User({email:'johnsnow@gmail.com',password:'johnsnow',codeFiles:[{language:'c',path:''}]})
console.log(User.find().pretty());