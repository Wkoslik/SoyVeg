require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

//add favorite ingredient to db
router.get('/faveingredients', (req, res) =>{
    res.send(req.body);
})


module.exports = router;