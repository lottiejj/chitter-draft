const express = require('express')
const router = express.Router({mergeParams: true})
const bcrypt = require('bcryptjs');

const creator = require('../models').creator

router.get('/new', async function (req, res) {
  res.render('sessions/new', { errors: [] })
})

router.post('/', async function (req, res) {
   const creators = await creator.findOne({ where: { email: req.body.email }})
  if (creators && bcrypt.compareSync(req.body.password, creators.passwordHash)) {
    req.session.creatorId = creators.id
    res.redirect('/tweets')
  } else {
    res.render('sessions/new', {errors: ["sorry, details not valid"]})
  }
})

router.delete('/', async function (req, res) {
  delete req.session.creatorId
  res.redirect('/')
})

module.exports = router
