const express = require('express')
const {
    getMeals,
    getMeal,
    createMeal,
    updateMeal,
} = require('../controllers/mealContollers')


const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getMeals)

router.get('/:createdAt', getMeal)

router.post('/', createMeal)

router.patch('/:jobId', updateMeal)

module.exports = router