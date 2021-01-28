//TODO remove res.send and console.logs
//TODO add comments as to what the routes are doing
//TODO Add comments as to why the routes are doing what they are doing
require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../models');

router.get('/', (req, res) => {
    //res.send('THIS IS THE PROFILE PAGE!')
    //res.send(req.user);
    let pk = req.user.id;
    db.user.findByPk(pk).then(user => {
        res.render('profile/profile', { user })
    })
})

router.get('/edit/:id', (req, res) => {
    // res.send(req.user.firstName)
    let pk = req.user.id
    db.user.findByPk(pk).then(user => {
        //res.send(user);
        res.render(`profile/edit`, { user })
    })
})


router.put('/edit/:id', (req, res) => {
    //res.send(req.body);
    req.user.firstName = req.body.firstName;
    req.user.lastName = req.body.lastName;
    req.user.email = req.body.email;
    req.user.age = req.body.age;
    req.user.pronouns = req.body.pronouns;
    req.user.nutritionPreference = req.body.nutritionPreference;
    console.log(req.user.firstName);
    req.user.save();
    res.redirect('/profile');
})


module.exports = router;