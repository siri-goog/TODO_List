const express = require('express')
const router = express.Router()
const validator = require('validator')
const db = require('../database')
const crypto = require('crypto')
const sessionChecker = require("./middleware/sessionChecker")

router.get('/', sessionChecker, (req, res) => {
    res.render('pages/todo', {
        username: req.session.username
    })
})
//--Get to-do details
router.get('/loadTodo', sessionChecker, (req, res) => {
    db.any('SELECT * FROM todo WHERE user_id = $1 ORDER BY todo_id;', [req.session.user_id])
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
router.post('/addTodo', sessionChecker, (req, res) => {
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
router.post('/deleteTodo/:todo_id', sessionChecker, (req, res) => {
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
//--Update to-do list status
router.post('/updateStatus/:todo_id', sessionChecker, (req, res) => {
    const todo_id = req.params.todo_id
    try {
        //Check current status
        db.any('SELECT * FROM todo WHERE todo_id = $1;', [todo_id])
        .then((data) => {
            if (data[0].status === 1) {
                //Status 2 = Completed
                console.log("Completed")
                db.query('UPDATE todo SET status = 2 WHERE todo_id = $1;', [todo_id])
                .then (() => {
                    res.redirect('/todo')
                })
                .catch((err) => {
                    console.log(err)
                })
            } else {
                //Status 1 = In Progress
                console.log("In Progress")
                db.query('UPDATE todo SET status = 1 WHERE todo_id = $1;', [todo_id])
                .then (() => {
                    res.redirect('/todo')
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.render('pages/error')
        })
    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router