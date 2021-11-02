const express = require( 'express' );
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const router = express.Router();


const { getUserById } = require('../controllers/getUserById');
const { updateUserEditorTheme }  = require('../controllers/updateUserEditorTheme')
router.get('/:id',jsonParser,getUserById);
console.log("updateUserEditorTheme ",updateUserEditorTheme)
router.patch('/:id',jsonParser,updateUserEditorTheme);

module.exports = router;