require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

let searchTerm;
let nutritionDatabase = `https://api.edamam.com/api/nutrition-data?app_id=${process.env.NUTRITION_ID}&app_key=${process.env.NUTRITION_KEY}&ingr=1oz%20parmesan`;
let foodDatabase = `https://api.edamam.com/api/food-database/v2/parser?ingr=${searchTerm}&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
let nutrients = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
let recipeDatabase = `https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`


router.get('/', (req, res) => {
    searchTerm = req.query.searchterm;
    console.log(searchTerm);
    let database = req.query.searchtype;
    console.log(database);
    if (database == 'food') { //IF SEARCHING FOR INGREDIENT
        axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${searchTerm}&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`)
            .then((response) => {
                let foodResults = response.data.hints;
                let ingObject = {
                    "ingredients": [
                        {
                            "quantity": 1,
                            "measureURI": foodResults[0].measures[8].uri,
                            "foodId": foodResults[0].food.foodId
                        }
                    ]
                }
                
                foodResults.forEach(food => {
                    let ingObject = {
                        "ingredients": [
                            {
                                "quantity": 1,
                                "measureURI": food.measures[8],
                                "foodId": food.food.foodId
                            }
                        ]
                    }
                    // axios.post(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`, ingObject
                    // )
                    // .then(response =>{
                    //     res.send(foodResults, response);
                    // })
                });
            })
    } else { //IF SEARCHING FOR RECIPE
        axios.get(`https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`)
            .then((response) => {
                res.send(response.data);
            })
    }
})

module.exports = router;