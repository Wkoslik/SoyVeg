//TODO remove res.send
//TODO remove console.logs
//TODO add comments as to what the routes are doing
//TODO add comments as to why the routes are doing what theyre doing

require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

//load favorite recipes
router.get('/', (req, res) => {
    //show all liked recipes where userId = req.user.id
    db.user.findByPk(req.user.id).then(user => {
        user.getLikedrecipes().then(recipe => {
            //res.send(recipe);
            res.render('fave/faverecipes', { recipe })
        })
    })
})

//add favorite recipe to db
router.post('/', (req, res) => {
    //res.send(req.body);
    let fullIngredients = req.body.ingredients;
    let length = 250;
    let trimmedIngrientsList = fullIngredients.substring(0, length);
    db.likedrecipe.findOrCreate({
        where: {
            recipeId: req.body.recipeId,
            name: req.body.name,
            ingredients: trimmedIngrientsList,
            healthLabel: req.body.healthLabel,
        }
    }).then(([recipe, created]) => {
        db.user.findByPk(req.user.id).then(user => {
            recipe.addUser(user).then(relationship => {
                //console.log(`${ingredient.name} was liked by ${user.name}`);
                //res.send(`${ingredient.name} was liked by ${user.name}`);
                //res.send('CREATED?')
                res.redirect('/faverecipes');
            })
        })
    })
})


//delete from favorites
router.delete('/:id', (req, res) => {
    db.user.findByPk(req.user.id).then(user => {
        db.likedrecipe.findByPk(req.body.id).then(recipe => {
            user.removeLikedrecipe(recipe).then(removed => {
                //             console.log("REMOVED!!!")
                res.redirect('/faverecipes');
            })
        })
    })
})



module.exports = router;
