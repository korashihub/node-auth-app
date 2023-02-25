const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
const mongoose = require('./db')
// const User = require('./models/User')

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, './views'))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/nodeauth_db'
    })
}))

const main = require('./routes/main')
app.use('/', main)

app.listen(3000, () => console.log('Server started on port http://localhost:3000/'))
