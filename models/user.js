const mongoose = require('mongoose')
const schema = mongoose.Schema

let userSchema = new schema({
    username: String,
    email: String,
    password: String
})

let User = mongoose.model("Users", userSchema)

module.exports = User