//TODO remove res.send
//TODO remove console.logs
//TODO add comments as to what the routes are doing
//TODO add comments as to why the routes are doing what theyre doing

require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

//load favorite ingredients
router.get('/', (req, res) => {
    // res.send('yodel');
    //show all liked ingredients where userId = req.user.id
    db.user.findByPk(req.user.id).then(user => {
        user.getDislikedingredients().then(ingredient => {
            //res.send(ingredient);
            res.render('dislike/dislikeingredients', { ingredient })
        })
    })
})

//add favorite ingredient to db
router.post('/', (req, res) => {
    //res.send(req.body);
    db.dislikedingredient.findOrCreate({
        where: {
            foodId: req.body.foodId,
            name: req.body.name,
            quantity: req.body.quantity,
            healthLabel: req.body.healthLabel,
            measureUri: req.body.measureURI
        }
    }).then(([ingredient, created]) => {
        db.user.findByPk(req.user.id).then(user => {
            ingredient.addUser(user).then(relationship => {
                //console.log(`${ingredient.name} was liked by ${user.name}`);
                //res.send(`${ingredient.name} was liked by ${user.name}`);
                //res.send('CREATED?')
                res.redirect('/dislikeingredients');
            })
        })
    })
}
)


//delete from favorites
router.delete('/:id', (req, res) => {
    db.user.findByPk(req.user.id).then(user => {
        db.dislikedingredient.findByPk(req.body.id).then(ingredient => {
            user.removeDislikedingredient(ingredient).then(removed => {
                res.redirect('/dislikeingredients');
            })
        })
    })
})



module.exports = router;
