const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs')

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

const  creator  = require('./models').creator

app.use(async (req, res, next) => {
  res.locals.currentcreator = (req.session.creatorId ? await creator.findOne({
    where: {
      id: req.session.creatorId
    }
  }) : undefined)
  res.locals.errors = []
  next()
})

const indexController = require('./controllers/index.js')
const tweetsController = require('./controllers/tweets.js')

const registrationsController = require('./controllers/registrations.js')
const sessionsController = require('./controllers/sessions.js')

const authenticator = (req, res, next) => {
  if (req.session.creatorId === undefined) {
    res.redirect('/')
  } else {
    next()
  }
}

app.use('/', indexController)
app.use('/registrations', registrationsController)
app.use('/sessions', sessionsController)
app.use('/tweets', tweetsController)





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
