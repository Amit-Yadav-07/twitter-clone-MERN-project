let mongoose = require('mongoose');


try {

    mongoose.connect('mongodb://127.0.0.1:27017/twitter_clone')
    console.log('DB connected');
} catch (error) {
    console.log(error);
}