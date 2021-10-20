const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(cors({
        origin:"*"
    })
)
var jsonParser = bodyParser.json();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/',jsonParser, (req,res) =>{
    // console.log(req);
    console.log(req.body)
    res.send(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})