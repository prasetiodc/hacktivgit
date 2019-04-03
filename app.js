require('dotenv').config()

const express = require('express')
const user = require('./route/user')
const port = 3000

let app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/users', user)

app.listen(port, ()=>{
    console.log(`Listen on port ${port} . . .`);
})