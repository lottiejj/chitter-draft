const express = require('express')
const router = express.Router({mergeParams: true})
const bcrypt = require('bcryptjs');

const  creator  = require('../models').creator

router.get('/new', async function (req, res) {
  res.render('registrations/new', { errors: [] })
})

router.post('/', async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  creator.create({
    email: req.body.email,
    passwordHash: hash
  }).then(creator => {
    req.session.creatorId = creator.id
    res.redirect('/tweets')
  }).catch(errors => {
    res.render('registrations/new', { errors: errors })
  })
})

module.exports = router
