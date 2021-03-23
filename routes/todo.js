const express = require('express')
const router = express.Router();
const validator = require('validator');
const db = require('../database')
const crypto = require('crypto');

router.get('/', (req, res) => {
    res.render('pages/todo', {
        username: req.session.username
    })
})
//--Get to-do details
router.get('/loadTodo', (req, res) => {
    db.any('SELECT * FROM todo WHERE user_id = $1;', [req.session.user_id])
    .then((data) => {
        if (data.length > 0) {
            res.json({
                data: data
            })
        } else {
            res.json({
                data: ""
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.render('pages/error')
    })
})
//--Add to-do
router.post('/addTodo', (req, res) => {
    const { desc } = req.body
    const status = 1 //In progress
    try {
        db.query('INSERT INTO todo (user_id, description, status) VALUES ($1, $2, $3);', [req.session.user_id, desc, status])
        .then (() => {
            res.redirect('/todo')
        })
        .catch((err) => {
            console.log(err)
        })
    } catch (error) {
        console.log(error.message)
    }
})
//--Delete to-do
router.post('/deleteTodo/:todo_id', (req, res) => {
    const todo_id = req.params.todo_id
    try {
        db.query('DELETE FROM todo WHERE todo_id = $1;', [todo_id])
        .then (() => {
            res.redirect('/todo')
        })
        .catch((err) => {
            console.log(err)
        })
    } catch (error) {
        console.log(error.message)
    }
})
module.exports = router