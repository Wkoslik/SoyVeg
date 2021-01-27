require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

//load favorite ingredients
router.get('/', (req, res) => {
    res.send('yodel');
    // db.user.findByPk(req.user.id).then(user =>{
    //     user.getLikedIngredients().then(ingredients =>{
    //         res.send(ingredients);
    //         //res.render('/', {ingredients})
    //     })
    // })
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
                console.log(`${ingredient.name} was liked by ${user.name}`);
                res.send(`${ingredient.name} was liked by ${user.name}`);
                //res.send('CREATED?')
            })
        })
    })
}
)


module.exports = router;

// db.user.findByPk(1).then(user =>{
//     user.getPets({ include: [db.toy]}).then(pets =>{
//         pets.forEach(pet =>{
//             console.log(`${user.name}'s pet ${pet.name} has ${pet.toys.length} toy(s)`)
//         })
//     })
