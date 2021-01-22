require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

let searchTerm;
let nutritionDatabase = `https://api.edamam.com/api/nutrition-data?app_id=${process.env.NUTRITION_ID}&app_key=${process.env.NUTRITION_KEY}&ingr=1oz%20parmesan`;
let foodDatabase =`https://api.edamam.com/api/food-database/v2/parser?ingr=${searchTerm}&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
let nutrients = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
let recipeDatabase = `https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`


router.get('/', (req, res) =>{
    searchTerm = req.query.searchterm;
    console.log(searchTerm);
    let database = req.query.searchtype;
    console.log(database);
    if(database == 'food'){
    axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${searchTerm}&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`)
        .then((response) =>{
            let foodResults = response.data.hints;
            // res.send(foodResults[0].food.label);
            res.render('results', { foodResults })
    })} else{
        axios.get(`https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`)
            .then((response)=>{
                res.send(response.data);
            })
    }
})

module.exports = router;