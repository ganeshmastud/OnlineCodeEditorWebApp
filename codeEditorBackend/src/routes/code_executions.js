const express = require( 'express' );
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const {python_execute} = require( '../controllers/python_execute' );
const {java_execute} = require( '../controllers/java_execute' );
const {c_execute} = require( '../controllers/c_execute' );
const {cpp_execute} = require( '../controllers/cpp_execute' );

const router = express.Router();
// console.log("python_execute ",python_execute)
router.post('/python',jsonParser,python_execute);
router.post('/java',jsonParser,java_execute);
router.post('/c',jsonParser,c_execute);
router.post('/cpp',jsonParser,cpp_execute);

module.exports = router;