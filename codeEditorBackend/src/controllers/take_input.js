var spawn = require('child_process').spawn,
    py    = spawn('python', ['compute_input.py']),
    data = "ganesh",
    dataString = '';

// py.stdout.on('data', function(data){
//   console.log('data sent0')
// });
// py.stdout.on('end', function(){
//   console.log('data sent');
// });
console.log("py ",py.stdin.write(data))
py.stdin.write(JSON.stringify(data));
py.stdin.end();