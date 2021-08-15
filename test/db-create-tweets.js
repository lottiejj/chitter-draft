const db = require('../models')

const createtweet = async () => {
  console.log('seeding database')
    await db.tweets.create({
    text: 'a test comment',
    createdAt: new Date('2021', '4', '3', '10', '30'),
    updatedAt: new Date('2021', '4', '3', '10', '30'),
    tweets: {
     
      text: 'hello',
      createdAt: new Date('2021', '4', '3', '10', '45'),
      updatedAt: new Date('2021', '4', '3', '10', '45'),
    }
  }, {
    include: [{
      association: db.tweets.creators
    }]
  });
}

module.exports = createtweet