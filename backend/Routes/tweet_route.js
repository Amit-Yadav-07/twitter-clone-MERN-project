let express = require('express');
let route = express.Router();
let mongoose = require('mongoose');
const User = require('../Models/User')
let cors = require('cors');
let JWT = require("jsonwebtoken");
const Tweet = require('../Models/Tweet')
// route.use(cors())
const authMiddleware = require('../middleware/authMiddleware')

route.get('/api/tweets/getUserTweets/:id', authMiddleware, async (req, res) => {

    const { id } = req.params

    try {
        const allTweets = await Tweet.find({ TweetedBy: id });
        console.log(allTweets);
        res.status(200).json({ tweets: allTweets, message: 'tweet fetched successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})


route.get('/api/tweets', authMiddleware, async (req, res) => {

    try {
        const allTweets = await Tweet.find({}).populate('TweetedBy').populate('Replies').sort('-createdAt');
        res.status(200).json({ tweets: allTweets, message: 'tweet fetched successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

route.post('/api/tweets', authMiddleware, async (req, res) => {

    console.log(req.body)
    console.log(req.user.userId)
    const { newTweetText, image_url } = req.body;
    try {
        if (!newTweetText) {
            return res.status(400).json({ message: "please enter something to tweet" });
        }

        if (newTweetText.length > 200) {
            return res.status(401).json({ message: "thoda chhota likho" });
        }

        const tweet = await Tweet.create({ tweetText: newTweetText, ImageURL: image_url, TweetedBy: req.user.userId });

        res.status(201).json({ message: "new tweeet created", tweet });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

route.put('/api/tweets/comment/:tweetId', authMiddleware, async (req, res) => {
    try {
        const { tweetId } = req.params;
        const comment = req.body.comment;
        console.log(comment)

        const tweet = await Tweet.create({ TweetedBy: req.user.userId, tweetText: comment, ImageURL: null, isAReply: true });

        const findTweet = await Tweet.findByIdAndUpdate({ _id: tweetId }, {
            $push: { Replies: tweet?._id }
        });

        res.status(201).json({ message: "comment route" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

route.delete('/api/tweets/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const tweet = await Tweet.findOne({ _id: id });



        if (!tweet) {
            return res.status(404).json({ message: "tweet not found" })
        }

        await Tweet.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "Tweet Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})


route.patch('/api/tweet/likeUnlike/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userSendingLikeRequest = req.user.userId;
        console.log(id);

        const tweet = await Tweet.findOne({ _id: id });



        if (!tweet) {
            return res.status(404).json({ message: "tweet not found" })
        }


        const alreadyLiked = tweet.Likes.includes(req.user.userId);
        if (!alreadyLiked) {
            await Tweet.updateOne({ _id: id },
                { $push: { Likes: req.user.userId } }, { new: true }
            )

            return res.status(201).json({ message: "Tweet Liked Successfully" });
        } else {
            await Tweet.updateOne({ _id: id },
                { $pull: { Likes: req.user.userId } }, { new: true }
            )
            return res.status(200).json({ message: "Tweet Unliked Successfully" });
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})





module.exports = route;

