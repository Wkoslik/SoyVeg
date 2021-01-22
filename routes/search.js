require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

let nutritionDatabase = `https://api.edamam.com/api/nutrition-data?app_id=${process.env.NUTRITION_ID}&app_key=${process.env.NUTRITION_KEY}&ingr=1oz%20parmesan`;
let foodDatabase =`https://api.edamam.com/api/food-database/v2/parser?ingr=parmesan%20cheese&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
let nutrients = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
let recipeDatabase = `https://api.edamam.com/search?q=soup&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`

router.get('/', (req, res) =>{
    console.log("SEARCH");
    // AXIOS.get(foodDatabase)
    // .then((response) =>{
    //     res.send(response.data);
    // })
    res.redirect('/results');
})

module.exports = router;