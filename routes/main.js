const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', (req, res) => {
    const title = 'App - Home'
    if (req.session.user == undefined) {
        res.render('home', { title })
    } else {
        User.findOne({ _id: req.session.user.id }).lean()
            .exec((err, user) => {
                if (user) {
                    const userData = user
                    userData.isLogged = true
                    res.render('home', { userData })
                } else res.render('home', { title })
            })
    }
})

router.get('/register', (req, res) => {
    const title = 'App - Register'
    if (req.session.user == undefined) {
        res.render('register', { title })
    } else {
        if (req.session.user.isLogged) res.redirect('/') 
    }
})

router.get('/login', (req, res) => {
    const title = 'App - Login'
    if (req.session.user == undefined) {
        res.render('login', { title })
    } else {
        if (req.session.user.isLogged) res.redirect('/')
    }
})

router.post('/register-submit', (req, res) => {
    const title = 'App - Register'
    const data = {
        alert: {
            success: { isActive: false },
            error: { isActive: false },
        }
    }

    User.find({
        email: req.body.email
    }).then(users => {
        if (users.length == 0) {
            User.create({
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password
            }, (err, user) => {
                if (!err) data.alert.success.isActive = true
            })
        }
        else data.alert.error.isActive = true
    })

    res.render('register', { title, data })
})

router.post('/login-submit', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!err) {
            if (user) {
                if (user.password == req.body.password) {
                    req.session.user = {
                        id: user._id,
                        isLogged: true
                    }
                    res.redirect('/')
                } else {
                    const title = 'App - Login'
                    const wrongPass = true
                    res.render('login', { title, wrongPass })
                }
            } else res.redirect('/register')
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router
