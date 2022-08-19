const express = require('express')
const {
    createTicket,
    getTicket,
    getTickets,
    deleteTicket,
    updateTicket
} = require('../controllers/ticketControllers')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all tickets
router.get('/', getTickets)

//GET a single ticket
router.get('/:id', getTicket)

//POST a ticket
router.post('/', createTicket)

//DELETE a single ticket
router.delete('/:id', deleteTicket)

//UPDATE a single ticket
router.patch('/:id', updateTicket)

module.exports = router