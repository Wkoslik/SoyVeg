require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

let searchTerm;
let nutritionDatabase = `https://api.edamam.com/api/nutrition-data?app_id=${process.env.NUTRITION_ID}&app_key=${process.env.NUTRITION_KEY}&ingr=1oz%20parmesan`;
let foodDatabase = `https://api.edamam.com/api/food-database/v2/parser?ingr=${searchTerm}&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
let nutrients = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
let recipeDatabase = `https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`

let userPreference = 'health=vegan'

//search for a food or recipe
router.get('/', (req, res) => {
    searchTerm = req.query.searchterm;
    let database = req.query.searchtype;
    if (database == 'food') { //IF SEARCHING FOR INGREDIENT
        axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${searchTerm}&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}&${userPreference}`)
            .then((response) => {
                let foodResults = response.data.hints;
                res.render('results/foodresults', { foodResults });
            }).catch(err => console.log(err));
    } else { //IF SEARCHING FOR RECIPE
        axios.get(`https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`)
            .then((response) => {
                let recipeResults = response.data.hits
                //res.send(recipeResults)
                res.render('results/reciperesults', { recipeResults })
            }).catch(err => console.log(err));
    }
})

//get details about a specifc ingredient
router.get('/:id', (req, res) => {
    axios.post(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`, {
        "ingredients": [
            {
                "quantity": 1,
                "measureURI": req.query.uri,
                "foodId": req.query.foodId
            }
        ]
    }
    )
    .then(response =>{
        let chosenOne = response.data;
        res.render('results/details', { chosenOne })
        //res.send(chosenOne.healthLabels);
    })
})


//find recipes including a specific food
router.get('/recipesincluding/:id', (req, res) =>{
    let searchTerm = req.params.id
    axios.get(`https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`)
            .then((response) => {
                let recipeResults = response.data.hits
                //res.send(recipeResults)
                res.render('results/reciperesults', { recipeResults })
            }).catch(err => console.log(err));
})

//get recipe details for a specific recipe
router.get('/recipedetails/:id', (req, res) =>{
    //res.send(req.query);
    let searchUri = req.query.uri;
    let uriArr;
    let joinedUri;
    console.log(`!!!!!!!!!!!! ${searchUri}`)
    if(!searchUri){
        searchUri = req.query.recipeId;
        console.log(`SECOND SEARCHUIR ${searchUri}`)
        joinedUri = searchUri;
    } else{
        uriArr = searchUri.split('');
        while(uriArr[0] != 'r'){
            uriArr.shift();
        }
        joinedUri = uriArr.join('');
    } 

    //console.log(searchUri);
    //res.send(joinedUri);
    // console.log(joinedUri);
    axios.get(`https://api.edamam.com/search?r=http%3A%2f%2fwww.edamam.com%2Fontologies%2fedamam.owl%23${joinedUri}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}`)
            .then((response) => {
                let recipeDetails = response.data[0]
                //res.send(recipeDetails)
                res.render('results/recipedetails', { recipeDetails })
            }).catch(err => console.log(err));
})



module.exports = router;