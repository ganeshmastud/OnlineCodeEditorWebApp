const express = require( 'express' );
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const {python_execute} = require( '../controllers/python_execute' );
const {java_execute} = require( '../controllers/java_execute' );
const {c_execute} = require( '../controllers/c_spawn' );
const {cpp_execute} = require( '../controllers/cpp_spawn' );

const {authenticate} = require('../middleware/auth')
const {request_data_code_size} =require('../middleware/req_datasize')
const router = express.Router();
// console.log("python_execute ",python_execute)
router.post('/python',jsonParser,request_data_code_size,authenticate,python_execute);
router.post('/java',jsonParser,authenticate,java_execute);
router.post('/c',jsonParser,authenticate,c_execute);
router.post('/cpp',jsonParser,authenticate,cpp_execute);

module.exports = router;


