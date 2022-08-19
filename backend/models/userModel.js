const { UserAddIcon } = require('@heroicons/react/solid')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// static login method
userSchema.statics.login = async function(email, password) {

    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('incorrect password')
    }

    return user
}

// static signup method
// when making use of the this keyword u have to use a regular function not an arrow function
userSchema.statics.signup = async function(email, name, password) {

    if(!email || !password || !name){
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    // if(!validator.isStrongPassword(password)){
    //     throw Error('Password not strong enough')
    // }

    const nameExits = await this.findOne({name: name })

    if (nameExits) {
        throw Error('Username already in use')
    }

    // u can find by id and parameters
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    //bcrypt is for hashing the password

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, name, password: hash })

    return user

}


module.exports = mongoose.model('User', userSchema)