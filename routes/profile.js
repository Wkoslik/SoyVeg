require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

//load user profile page
router.get('/', (req, res) => {
    let pk = req.user.id;
    //identify the user signed in and render their profile page
    db.user.findByPk(pk).then(user => {
        res.render('profile/profile', { user })
    })
})

//Edit the user profile
router.get('/edit/:id', (req, res) => {
    let pk = req.user.id
    db.user.findByPk(pk).then(user => {
        res.render(`profile/edit`, { user })
    })
})

//Save changes to the user profile and redirect to the profile page
router.put('/edit/:id', (req, res) => {
    req.user.firstName = req.body.firstName;
    req.user.lastName = req.body.lastName;
    req.user.email = req.body.email;
    req.user.age = req.body.age;
    req.user.pronouns = req.body.pronouns;
    req.user.nutritionPreference = req.body.nutritionPreference;
    req.user.save();
    res.redirect('/profile');
})


module.exports = router;