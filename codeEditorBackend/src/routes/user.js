const express = require( 'express' );
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const router = express.Router();


const { getUserById } = require('../controllers/getUserById');
const { updateUserEditorTheme }  = require('../controllers/updateUserEditorTheme')
const { updateUserCodingLanguage } = require('../controllers/updateUserCodingLanguage')
router.get('/:id',jsonParser,getUserById);
// console.log("updateUserEditorTheme ",updateUserEditorTheme)
router.patch('/:id',jsonParser,updateUserEditorTheme);
// console.log("updateUserCodingLanguage fn", updateUserCodingLanguage);
router.patch('/:id/language',jsonParser,updateUserCodingLanguage)
// router.patch('/path/:id/vcool',jsonParser,(req,res) =>{
//     console.log(req.params.id,req.body);
//     res.send(req.params.id);
// })
module.exports = router;