let mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      require: true,
   },
   Followers: {
      type: [mongoose.Types.ObjectId],
      ref: 'User'
   },
   Following: {
      type: [mongoose.Types.ObjectId],
      ref: 'User'
   },
   email: {
      type: String,
      require: true,
      unique: true
   },
   password: {
      type: String,
      require: true
   },

   dateOfBirth: {
      type: Date,
   },
   ProfileImageURL: {
      type: String,
   },

})

module.exports = mongoose.model('User', UserSchema)