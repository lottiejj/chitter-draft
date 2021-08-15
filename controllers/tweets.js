const express = require("express");
let router = express.Router({ mergeParams: true });

const tweets = require("../models").tweets
const creator = require("../models").creator


router.get("/", async function (req, res) {
  const tweet = await tweets.findAll({
   
    order: [["createdAt"]],
  });
  const creators= await creator.findAll();
  console.log(tweet)
  res.render("tweets/index.ejs", {
    tweets: tweet,
    creator: creators,
  });
});



router.post("/", async function (req, res) {
  console.log(req.session)
  const creators = await creator.findOne({ where: { id: req.session.creatorId} });

  await tweets.create({
    text: req.body.text,
    creatorId: creators.id,
  });

  res.redirect("/tweets");
});

router.delete("/:tweetId", async function (req, res) {
  const tweet = await tweets.destroy({ where: { id: req.params.tweetId} });
 
  
 

  res.redirect("/tweets");
});

module.exports = router;