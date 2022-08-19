const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mealSchema = new Schema({
    session: {
        type: String,
        required: true,
    },
    food : [{
        type: String,
    }],
    user_id:{
        type: String,
        required: true 
    },
    price: [{
        type: Number,
    }],
    state: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Meal', mealSchema)