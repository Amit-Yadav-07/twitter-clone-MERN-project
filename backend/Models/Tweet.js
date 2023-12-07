let mongoose = require('mongoose');

let TweetSchema = new mongoose.Schema({
    tweetText: {
        type: String,
        // required: [true, 'Please enter tweet text'],
    },
   
    TweetedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        // required: [true, 'Please provide user'],
    },
    Likes: {
        type:[mongoose.Types.ObjectId],
        ref: 'User',
    },

    RetweetBy: {
        type:[mongoose.Types.ObjectId],
        ref: 'User',
    },
    ImageURL: {
        type: String,
        default :'https://plus.unsplash.com/premium_photo-1690446955129-7248ac32faaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=879&q=80'
    },
    Replies: {
        type:[mongoose.Types.ObjectId],
        ref: 'Tweet',
    },
    isAReply:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

module.exports = mongoose.model('Tweet',TweetSchema)