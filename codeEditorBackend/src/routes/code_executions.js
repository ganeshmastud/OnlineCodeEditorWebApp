const express = require( 'express' );
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const {python_execute} = require( '../controllers/python_execute' );
// const {java_execute} = require( '../controllers/java_exec' );
// const {c_execute} = require( '../controllers/c_exec' );
// const {cpp_execute} = require( '../controllers/cpp_exec' );

const router = express.Router();
// console.log("python_execute ",python_execute)
router.post('/python',jsonParser,python_execute);
// router.post('/java',java_execute);
// router.post('/c',c_execute);
// router.post('/cpp',cpp_execute)

module.exports = router;