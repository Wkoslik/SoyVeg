require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

//add favorite ingredient to db
router.get('/', (req, res) =>{
    res.send('yodel');
    // db.user.findByPk(req.user.id).then(user =>{
    //     user.getLikedIngredients().then(ingredients =>{
    //         res.send(ingredients);
    //         //res.render('/', {ingredients})
    //     })
    // })
})


module.exports = router;

// db.user.findByPk(1).then(user =>{
//     user.getPets({ include: [db.toy]}).then(pets =>{
//         pets.forEach(pet =>{
//             console.log(`${user.name}'s pet ${pet.name} has ${pet.toys.length} toy(s)`)
//         })
//     })
// })