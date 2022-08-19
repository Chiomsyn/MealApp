require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const ticketRoutes = require('./routes/tickets')
const userRoutes = require('./routes/user')
const mealRoutes = require('./routes/meal')

const app = express() 

// for request such as post or update that requires a body to upload we use the
// express.json to get the body of the request and add the body to the request parameter

// middleware
app.use(express.json())

app.use((req, res, next) => {
    next()
})


app.use('/api/tickets', ticketRoutes)
app.use('/api/user', userRoutes)
app.use('/api/meals', mealRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('connected to db and listening on port ' + process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

