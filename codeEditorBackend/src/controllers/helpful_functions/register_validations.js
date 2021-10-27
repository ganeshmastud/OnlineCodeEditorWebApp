function register_validation(user){
        // console.log("in reg val ",user);
        let registratin_error={
            username_err:[],
            password_errs:[],
            retype_password_err:[],
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
            registratin_error.username_err="please enter the username atleast 3 characters long";
        }else{
            registratin_error.username_err="";
        }

        //email validations 
        if(!email_regex.test(user.email)){
            registratin_error.email_err.push("You have entered an invalid email address!")
        }
        if(user.password.length <8){
            registratin_error.password_errs.push("Password should be 8 character long")
            registratin_error.flag=false;
        }
        if(!hasNumber.test(user.password)){
            registratin_error.password_errs.push('Password should contains atleast 1 number')
            registratin_error.flag=false;
        }
        if(!uppercase.test(user.password)){
            registratin_error.password_errs.push('Password should contains atleast 1 uppercase letter')
            registratin_error.flag=false;
        }
        if(!lowecase.test(user.password)){
            registratin_error.password_errs.push('Password should contains atleast 1 lowercase letter')
            registratin_error.flag=false;
        }
        if(!specialSymbol.test(user.password)){
            registratin_error.password_errs.push('Password should contains atleast 1 Special letter')
            registratin_error.flag=false;
        }
        if(user.password !== user.retype_password){
            registratin_error.retype_password_err ="Password doesn't match, please enter the same password again"
            registratin_error.flag=false;
        }   
     
    return registratin_error;
}

module.exports = {
    register_validation
} 