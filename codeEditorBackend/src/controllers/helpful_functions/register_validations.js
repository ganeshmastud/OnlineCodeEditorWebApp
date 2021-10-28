function register_validation(user){
        // console.log("in reg val ",user);
        let registration_error={
            username_err:[],
            password_errs:[],
            // retype_password_err:[],
            email_err:[],
            flag:true

        };
        let errors=[]
        // let flag=true;
        let hasNumber = /\d/ //new RegExp('d'); 
        let uppercase =/[A-Z]+/g //new RegExp('+[A-Z]','g');
        let lowecase = /[a-z]+/g
        let specialSymbol = /[!@#$%^&*()?:";{'`~/,.<>}]+/g
        let email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //user name validation
        let usernamelen = user.name;
        if(usernamelen.length <=2){
            registration_error.username_err="please enter the username atleast 3 characters long";
        }else{
            registration_error.username_err="";
        }

        //email validations 
        if(!email_regex.test(user.email)){
            registration_error.email_err.push("You have entered an invalid email address!")
        }
        if(user.password.length <8){
            registration_error.password_errs.push("Password should be 8 character long")
            registration_error.flag=false;
        }
        if(!hasNumber.test(user.password)){
            registration_error.password_errs.push('Password should contains atleast 1 number')
            registration_error.flag=false;
        }
        if(!uppercase.test(user.password)){
            registration_error.password_errs.push('Password should contains atleast 1 uppercase letter')
            registration_error.flag=false;
        }
        if(!lowecase.test(user.password)){
            registration_error.password_errs.push('Password should contains atleast 1 lowercase letter')
            registration_error.flag=false;
        }
        if(!specialSymbol.test(user.password)){
            registration_error.password_errs.push('Password should contains atleast 1 Special letter')
            registration_error.flag=false;
        }
        // if(user.password !== user.retype_password){
        //     console.log("user.password user.retype_password",user.password, user.retype_password)
        //     registration_error.retype_password_err ="Password doesn't match, please enter the same password again"
        //     registration_error.flag=false;
        // }   
     
    return registration_error;
}

module.exports = {
    register_validation
} 