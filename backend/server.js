let express = require('express');
let mongoose = require('mongoose');
require('./config'); // for DB connection 
let app = express();
let cors = require('cors');
let route = require('./Routes/user_route.js');
const tweetRoutes = require('./Routes/tweet_route');
const imageRoutes = require('./Routes/image_route');
const editProfileRoutes = require('./Routes/edit_profile_routes');
const dotenv = require('dotenv')
dotenv.config()
let PORT = 5000;

app.use(cors())
app.use(express.json())


app.use(route);
app.use(tweetRoutes);
app.use(imageRoutes);
app.use(editProfileRoutes);




app.listen(PORT, () => {
    console.log(`server is running on port no ${PORT}`);
})
