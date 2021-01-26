require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

let searchTerm;
let nutritionDatabase = `https://api.edamam.com/api/nutrition-data?app_id=${process.env.NUTRITION_ID}&app_key=${process.env.NUTRITION_KEY}&ingr=1oz%20parmesan`;
let foodDatabase = `https://api.edamam.com/api/food-database/v2/parser?ingr=${searchTerm}&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
let nutrients = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
let recipeDatabase = `https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`

let userPreference = 'health=vegan'

router.get('/', (req, res) => {
    searchTerm = req.query.searchterm;
    console.log(searchTerm);
    let database = req.query.searchtype;
    console.log(database);
    if (database == 'food') { //IF SEARCHING FOR INGREDIENT
        axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${searchTerm}&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}&${userPreference}`)
            .then((response) => {
                let foodResults = response.data.hints;
                // let ingObject = {
                //     "ingredients": [
                //         {
                //             "quantity": 1,
                //             "measureURI": foodResults[0].measures[8].uri,
                //             "foodId": foodResults[0].food.foodId
                //         }
                //     ]
                //  }
                //res.send(foodResults);
                res.render('results/foodresults', { foodResults });
                // foodResults.forEach(food => {
                //     //BLOWS OUT THE LIMITS, need to figure out workaround
                //     axios.post(`https://api.edamam.com/api/food-database/v2/nutrients?app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`, {
                //         "ingredients": [
                //             {
                //                 "quantity": 1,
                //                 "measureURI": food.measures[0].uri,
                //                 "foodId": food.food.foodId
                //             }
                //         ]
                //     }
                //     )
                // .then(response => {
                //     res.send(response.data);
                // })
                // }
                // )
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

router.get('/:id', (req, res) => {
    // let searchTerm = req.params.display
    // let switchSpacesRegex = /\s/g;
    // searchTerm = searchTerm.replace(switchSpacesRegex, function (x) {
    //     return x = '%20';
    // })
    //res.send(req.params);
    //console.log(searchTerm);
    // let foodId2 = req.params.id;
    // res.send(req.query);
    // //let foodId = '&foodId=food_bpfy0kabklpd7raf3tah4bf0s5hp';
    // let url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${searchTerm}&app_id=${process.env.INGREDIENT_ID}&app_key=${process.env.INGREDIENT_KEY}`;
    // res.send(id);
    // axios.get(url)
    // .then(response =>{
    //     let 
    //     let items = response.data.hints;
    //     const chosenOne = items.filter(item => item.food.foodId === 'food_bpfy0kabklpd7raf3tah4bf0s5hp');
    //     console.log(chosenOne);
    //     res.send(chosenOne);
    // })
    //console.log(req.query.uri)
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
        //res.send(response.data)
        let chosenOne = response.data;
        res.render('results/details', { chosenOne })
        //res.send(chosenOne.healthLabels);
    })
})



router.get('/recipesincluding/:id', (req, res) =>{
    let searchTerm = req.params.id
    axios.get(`https://api.edamam.com/search?q=${searchTerm}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`)
            .then((response) => {
                let recipeResults = response.data.hits
                //res.send(recipeResults)
                res.render('results/reciperesults', { recipeResults })
            }).catch(err => console.log(err));
})

router.get('/recipedetails/:id', (req, res) =>{
    //res.send(req.query);
    let searchUri = req.query.uri;
    let uriArr = searchUri.split('');
    //res.send(uriArr);
    while(uriArr[0] != 'r'){
        uriArr.shift()
    }

    let joinedUri = uriArr.join('');

    let uri = 'http%3A%2f%2fwww.edamam.com%2Fontologies%2fedamam.owl%23recipe_fe9dd5d2a04a20445e0de6fc7cfc140f'
    //console.log(searchUri);
    //res.send(joinedUri);
    // console.log(joinedUri);
     axios.get(`https://api.edamam.com/search?r=http%3A%2f%2fwww.edamam.com%2Fontologies%2fedamam.owl%23${joinedUri}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&health=vegan&health=vegetarian`)
            .then((response) => {
                let recipeDetails = response.data[0]
                //res.send(recipeDetails)
                res.render('results/recipedetails', { recipeDetails })
            }).catch(err => console.log(err));
})



module.exports = router;