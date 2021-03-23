const express = require('express')
const router = express.Router();
const validator = require('validator');
const db = require('../database')
const crypto = require('crypto');

router.get('/', (req, res) => {
    res.render('pages/signup', {
        username: req.session.username,
        user_id: req.session.user_id
    })
})

module.exports = router