require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

//load recipes that the user has saved that the dislike
router.get('/', (req, res) => {
    //identify user who is signed in
    db.user.findByPk(req.user.id).then(user => {
        //load recipe user dislikes
        user.getDislikedrecipes().then(recipe => {
            res.render('dislike/dislikerecipes', { recipe })
        })
    })
})

//add dislike recipes to db
router.post('/', (req, res) => {
    //get the list of ingredients
    let fullIngredients = req.body.ingredients;
    //DB has a 255 character limit
    let length = 250;
    //trim the ingredients list so that it's less than 255 characters
    let trimmedIngrientsList = fullIngredients.substring(0, length);
    //find the recipe in the disliked recipe DB. create if it doesn't exist
    db.dislikedrecipe.findOrCreate({
        where: {
            recipeId: req.body.recipeId,
            name: req.body.name,
            ingredients: trimmedIngrientsList,
            healthLabel: req.body.healthLabel,
        }
    }).then(([recipe, created]) => {
        //find signed in user
        db.user.findByPk(req.user.id).then(user => {
            //join user with recipe
            recipe.addUser(user).then(relationship => {
                res.redirect('/dislikerecipes');
            })
        })
    })
})


//delete from dislike
router.delete('/:id', (req, res) => {
    //find the user signed in
    db.user.findByPk(req.user.id).then(user => {
        //find the recipe clicked
        db.dislikedrecipe.findByPk(req.body.id).then(recipe => {
            //remove connection between user and recipe
            user.removeDislikedrecipe(recipe).then(removed => {
                res.redirect('/dislikerecipes');
            })
        })
    })
})



module.exports = router;
