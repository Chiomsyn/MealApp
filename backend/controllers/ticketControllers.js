const Ticket = require('../models/ticketModels')
const mongoose = require('mongoose')

// get all tickets
const getTickets = async (req, res) => {
    const user_id = req.user._id
    try {
        const tickets = await Ticket.find({ user_id }).sort({createdAt: -1})
        res.status(200).json(tickets)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// // get all tickets
// const getTickets = async (req, res) => {
//     try {
//         const tickets = await Ticket.find({}).sort({createdAt: -1})
//         res.status(200).json(tickets)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

// get a single ticket
const getTicket = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: 'No such Ticket'})
    }

    const ticket = await Ticket.findById(id)

    if(!ticket) {
        res.status(404).json({error: 'No such Ticket'})
    }

    res.status(200).json(ticket)
}


//create new ticket
const createTicket = async(req, res) => {
    const {ticketNo, food, user, amount} = req.body

    let emptyFields = []
    if(!ticketNo) {
        emptyFields.push('ticketNo')
    }
    if(!food) {
        emptyFields.push('food')
    }
    if(!user) {
        emptyFields.push('user')
    }
    if(!amount) {
        emptyFields.push('amount')
    }
    
    try {
        const user_id = req.user._id
        const ticket = await Ticket.create({ticketNo, food, user, user_id, amount})
        res.status(200).json(ticket)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//delete a ticket
const deleteTicket = async (req, res) => {
    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: 'No such Ticket'})
    }

    const ticket = await Ticket.findByIdAndDelete({_id: id})

    if(!ticket) {
        res.status(404).json({error: 'No such Ticket'})
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields!', emptyFields})
    }

    res.status(200).json(ticket)
}


//update a ticket
const updateTicket = async (req, res) => {
    const { id } = req.params


    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: 'No such Ticket'})
    }

    const ticket = await Ticket.findOneAndUpdate({_id: id}, {...req.body})

    if(!ticket) {
        res.status(404).json({error: 'No such Ticket'})
    }

    res.status(200).json(ticket)
}

module.exports = {
    createTicket,
    getTicket,
    getTickets,
    deleteTicket,
    updateTicket
}