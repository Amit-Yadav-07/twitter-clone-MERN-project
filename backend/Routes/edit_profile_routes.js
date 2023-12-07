
let express = require('express');
let route = express.Router(); 
let mongoose = require('mongoose');
const User = require('../Models/User')
let bcrypt = require("bcrypt");
let cors = require('cors');
let JWT = require("jsonwebtoken");
let env = require('dotenv')
env.config();
const authMiddleware = require('../middleware/authMiddleware')

// route.use(cors())


//-------------------------------login API-------------------------------


route.patch('/api/edit_profile',authMiddleware,async(req,res)=>{

    try {
        const {editUserDetails} = req.body
        console.log(editUserDetails)
        // ! store the old user in new oldUser variable
        const oldUser = await User.findOne({_id:req.user.userId});


        const updatedUser = await User.findByIdAndUpdate({_id:req.user.userId},{
            // ! save the old field if new field is not given
            name:editUserDetails.new_name || oldUser.name,
            email:editUserDetails.new_email || oldUser.email,
            username:editUserDetails.new_username || oldUser.username,
            dateOfBirth:editUserDetails.date_of_birth || oldUser?.dateOfBirth || null,
        },{
            new:true
        });

        const newToken = JWT.sign(
            {userId:updatedUser._id,
                user:{firstName:updatedUser.name}},
                process.env.JWT_SECRET,
                {expiresIn:process.env.JWT_LIFETIME}
        );
        
        res.status(200).json({oldUser,updatedUser,newToken});
    } catch (error) {
        res.status(500).json({message:error.message});
    }

})





// --------------------------Register API------------------------------










 





module.exports = route;