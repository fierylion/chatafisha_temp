const express = require("express"); // leader
const cors = require("cors")

//Security packages
var sqlinjection = require('sql-injection')
var helmet = require('helmet')
var xss = require('xss-clean')
var rateLimit = require('express-rate-limit')

var app = express();


app.use(cors())

const bp = require('body-parser');

require("dotenv/config")

var db = require("./config/db")
db

app.use(bp.json())
app.use(bp.urlencoded({extended:true}))

//Security
app.set('trust proxy', 1)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000 // limit each IP to 100 requests per windowMs
  }))
app.use(helmet())
app.use(xss())


app.get('/',async (req,res)=>{
    res.status(200).json("hello world")
})

app.use('/api/',require("./routes/routes"));

// file management
app.use('/uploads', express.static('uploads'))





// start server
app.listen(process.env.PORT,()=>{console.log(`app listen on port: ${process.env.PORT}`)})