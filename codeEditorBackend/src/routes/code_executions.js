const express = require( 'express' );
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const {python_execute} = require( '../controllers/python_execute' );
const {java_execute} = require( '../controllers/java_spawn' );
const {c_execute} = require( '../controllers/c_spawn' );
const {cpp_execute} = require( '../controllers/cpp_spawn' );

const {authenticate} = require('../middleware/auth')
const {request_data_code_size} =require('../middleware/req_datasize')
const router = express.Router();
// console.log("python_execute ",python_execute)
router.post('/python',authenticate,jsonParser,request_data_code_size,python_execute);
router.post('/java',authenticate,jsonParser,java_execute);
router.post('/c',authenticate,jsonParser,c_execute);
router.post('/cpp',authenticate,jsonParser,cpp_execute);

module.exports = router;


