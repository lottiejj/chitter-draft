const db = require('../models')

const truncateTables = () => {
  console.log('truncating tables')
  db.tweets.destroy({ truncate : true, cascade: true })
  db.creators.destroy({ truncate : true, cascade: true })
}

module.exports = truncateTables