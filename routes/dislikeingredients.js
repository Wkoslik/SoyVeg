require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

//load disliked ingredients from user profile
router.get('/', (req, res) => {
    //find signed in user ID
    db.user.findByPk(req.user.id).then(user => {
        //get all dislikedingredients that are tied to that userid
        user.getDislikedingredients().then(ingredient => {
            //render the page
            res.render('dislike/dislikeingredients', { ingredient })
        })
    })
})

//add a dislike ingredient to db and tie to the user to said they didn't like it
router.post('/', (req, res) => {
    //find the ingredient in the database --> create if not found
    db.dislikedingredient.findOrCreate({
        where: {
            foodId: req.body.foodId,
            name: req.body.name,
            quantity: req.body.quantity,
            healthLabel: req.body.healthLabel,
            measureUri: req.body.measureURI
        }
    }).then(([ingredient, created]) => {
        //find the user who is signed in
        db.user.findByPk(req.user.id).then(user => {
            //join the ingredient and the user together in the join table
            ingredient.addUser(user).then(relationship => {
                //redirect to the dislikeingredients page
                res.redirect('/dislikeingredients');
            })
        })
    })
}
)


//delete from dislikes
router.delete('/:id', (req, res) => {
    //find the user who is signed in
    db.user.findByPk(req.user.id).then(user => {
        //find the ingredient that was selected
        db.dislikedingredient.findByPk(req.body.id).then(ingredient => {
            //remove the connection between the ingredient and the user
            user.removeDislikedingredient(ingredient).then(removed => {
                res.redirect('/dislikeingredients');
            })
        })
    })
})



module.exports = router;
