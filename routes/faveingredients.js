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
        user.getLikedingredients().then(ingredient => {
            //res.send(ingredient);
            res.render('fave/faveingredients', { ingredient })
        })
    })
})

//add favorite ingredient to db
router.post('/', (req, res) => {
    //res.send(req.body);
    db.likedingredient.findOrCreate({
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
                res.redirect('/faveingredients');
            })
        })
    })
}
)


//delete from favorites
router.delete('/:id', (req, res) => {
    db.user.findByPk(req.user.id).then(user => {
        db.likedingredient.findByPk(req.body.id).then(ingredient => {
            user.removeLikedingredient(ingredient).then(removed => {
                console.log("REMOVED!!!")
                res.redirect('/');
            })
        })
    })
})



module.exports = router;
