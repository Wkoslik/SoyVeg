require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

let searchTerm;
let userPreference;

//search for a food or recipe
//TODO eliminate edamam limit?
router.get('/', (req, res) => {
    if(req.user.nutritionPreference == 'Vegan'){
        userPreference = `health=vegan`;
    } else{
        userPreference = `health=vegetarian`;
    }
    console.log(req.user.nutritionPreference);
    searchTerm = req.query.searchterm;
    let database = req.query.searchtype;
    if (database == 'food') { //IF SEARCHING FOR INGREDIENT
        axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${searchTerm}&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}&${userPreference}`)
            .then((response) => {
                console.log(` !!!!!!!!!!!!!!!!!!!!! ${userPreference}`);
                let foodResults = response.data.hints;
                //res.send(foodResults);
                res.render('results/foodresults', { foodResults });
            }).catch(err => console.log(err));
    } else { //IF SEARCHING FOR RECIPE
        axios.get(`https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&${userPreference}`)
            .then((response) => {
                console.log(` !!!!!!!!!!!!!!!!!!!!! ${userPreference}`);
                let recipeResults = response.data.hits
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
        .then(response => {
            let chosenOne = response.data;
            res.render('results/details', { chosenOne })
        })
})


//find recipes including a specific food
router.get('/recipesincluding/:id', (req, res) => {
    let searchTerm = req.params.id
    axios.get(`https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`)
        .then((response) => {
            let recipeResults = response.data.hits
            res.render('results/reciperesults', { recipeResults })
        }).catch(err => console.log(err));
})

//get recipe details for a specific recipe
router.get('/recipedetails/:id', (req, res) => {
    let searchUri = req.query.uri;
    let uriArr;
    let joinedUri;
    console.log(`!!!!!!!!!!!! ${searchUri}`)
    if (!searchUri) {
        searchUri = req.query.recipeId;
        console.log(`SECOND SEARCHUIR ${searchUri}`)
        joinedUri = searchUri;
    } else {
        uriArr = searchUri.split('');
        while (uriArr[0] != 'r') {
            uriArr.shift();
        }
        joinedUri = uriArr.join('');
    }

    axios.get(`https://api.edamam.com/search?r=http%3A%2f%2fwww.edamam.com%2Fontologies%2fedamam.owl%23${joinedUri}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}`)
        .then((response) => {
            let recipeDetails = response.data[0];
            //res.send(recipeDetails);
            res.render('results/recipedetails', { recipeDetails })
        }).catch(err => console.log(err));
})



module.exports = router;