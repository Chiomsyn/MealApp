const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ticketSchema = new Schema({
    ticketNo: {
        type: Number,
        required: true,
        unique: true
    },
    food: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true 
    },
    amount: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Ticket', ticketSchema)
