require('dotenv').config()
const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken')
const client = new OAuth2Client(process.env.CLIENT_ID)
const express = require('express')
const user = require('./route/user')
const cors = require('cors')
const port = 3000
const Model = require('./models/user')

let app = express()

app.use(cors())

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/users', user)

//https://developers.google.com/identity/sign-in/web/backend-auth
app.post('/google-sign-in', (req, res)=>{
    // console.log(req.body.token,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,");
    
    client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.CLIENT_ID,
    })
    .then(ticket=>{
        const payload = ticket.getPayload()
        // console.log(payload)
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<TES")
        Model.findOne({
            email:payload.email
        })
        .then(user=>{ 
            console.log("TES<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            
            if(!user){
                console.log("1");
                
                Model.create({
                    username: payload.name,
                    email: payload.email,
                    password: Math.floor((Math.random() * 899999) + 100000)
                })
                .then(data=>{
                    const token = jwt.sign({ username: data.name, email: data.email}, process.env.JWT_TOKEN);
                    res.json({token})
                })
            }else{
                console.log("2");

                const token = jwt.sign({ username: payload.name, email: payload.email}, process.env.JWT_TOKEN);
                res.json({token})
            }
        })
        .catch(err=>{
            res.json({err})
            console.log("ERROR1")

        })
    })
    .catch(err=>{
        res.json("ERROR")
        console.log("ERROR2")

    })
    
})


app.listen(port, ()=>{
    console.log(`Listen on port ${port} . . .`);
})