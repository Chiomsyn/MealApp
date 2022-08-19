const Meal = require('../models/mealModel')
const mongoose = require('mongoose')

const getMeals = async (req, res) => {
    const user_id = req.user._id
  

    try {
        const meals = await Meal.find({ user_id }).sort({createdAt: -1})
        res.status(200).json(meals)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getMeal = async (req, res) => {

    let today = new Date();
    today.setHours(0,0,0,0); // set to 0:00
    
    let tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)


    try {
        const meals = await Meal.find({  createdAt :  {$gte: today, $lt: tomorrow} })
        res.status(200).json(meals)
    } catch (error) {
        res.status(400).json({error: error.message}) 
        console.log(error.message)
    }
}

const createMeal = async(req, res) => {
    const {session, food, price, state} = req.body

    try {
        const user_id = req.user._id
        const meal = await Meal.create({session, food, user_id, price, state})
        res.status(200).json(meal)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

    const updateMeal = async (req, res) => {
        const { jobId } = req.params

        console.log(jobId)

      try {
        // if(!mongoose.Types.ObjectId.isValid(jobId)){
        //     res.status(404).json({error: 'No such Meal'})
        // }

        const meal = await Meal.findOneAndUpdate({_id: jobId}, {...req.body})

        // if(!meal) {
        //     res.status(404).json({error: 'No such Meal'})
        // }
    
        res.status(200).json(meal)
      } catch (error) {
        res.status(400).json({error: error.message})
        console.log(error.message)
      }
    }

    module.exports = {
        getMeals,
        getMeal,
        createMeal,
        updateMeal
    }