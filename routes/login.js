const express = require('express')
const router = express.Router();
const validator = require('validator');
const db = require('../database')
const crypto = require('crypto');

let username = ""

router.get('/', (req, res) => {
    res.render('pages/login', {
        username: username,
        user_id: req.session.user_id
    })
})

module.exports = router