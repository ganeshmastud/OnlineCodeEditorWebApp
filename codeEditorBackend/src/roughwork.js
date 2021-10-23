console.log("cool")
const path = require('path')
console.log("path :",path.join(path.normalize('../CodeFiles'), 'dummy.py'))
const fs = require('fs')

console.log(fs.readdir('./routes'))