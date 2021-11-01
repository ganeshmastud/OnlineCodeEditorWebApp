
function codeInputValidation(userId,selectLanguage,codeArea){
    // console.log("codeInputValidation ",userId,selectLanguage,codeArea)
    if(!userId || userId.length <= 0 ) { //(userId === undefined || userId === null) = !userId
        const error = new Error("Please provide the right userId")
        return error;
    }
    if(selectLanguage === undefined || selectLanguage === null){ //select_language === undefined || select_language === null
        const error = new Error("Please provide the right language details")
        return error;
    }
    if(!codeArea || codeArea.length <=0) { //codearea === undefined || codearea === null ||
        
        const error = new Error("Please provide some code to run")
        error.status = 204;
        return error;
    }
    return ''

}
// console.log("in codeInputValidatiaon fn file type of: ",typeof codeInputValidation)
module.exports={
    codeInputValidation
}
