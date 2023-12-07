let express = require('express');
let route = express.Router();
let mongoose = require('mongoose');
const User = require('../Models/User')
const fs = require('fs')
let cors = require('cors');
let JWT = require("jsonwebtoken");
const Tweet = require('../Models/Tweet')
const cloudinaryConfig = require('../cloudinaryConfig')
const authMiddleware = require('../middleware/authMiddleware');
const { initialFilter, postProcess } = require('../utilities/multerFunctions');
const { getPublicId } = require('../utilities/utils');



route.post('/api/image', authMiddleware, initialFilter.single('file'), postProcess, async (req, res) => {

    if (req?.file) {

        try {
            const localPath = `uploads/${req?.file.filename}`
            console.log(localPath, 'localpath')

            const result = await cloudinaryConfig.uploader.upload(localPath, {
                folder: 'tweets'
            })
            console.log(result)



            fs.unlinkSync(localPath)

            return res.json({ imgURL: result?.secure_url });
        } catch (error) {
            console.log(error)
        }
    }


})

// upload user profile image
route.patch('/api/image', authMiddleware, initialFilter.single('file'), postProcess, async (req, res) => {
    console.log(req.file, 'file')

    const { userId } = req.user;
    console.log(userId)
    const user = await User.findOne({ _id: userId })

    if (user?.ProfileImageURL) {
        try {

            // ! when there is already an image
            await cloudinaryConfig.uploader.destroy(`users/` + getPublicId(user?.ProfileImageURL));

            // ! and then upload the new image

            const localPath = `uploads/${req?.file.filename}`
            console.log(localPath, 'localpath')

            const result = await cloudinaryConfig.uploader.upload(localPath, {
                folder: 'users'
            })
            console.log(result)



            fs.unlinkSync(localPath)

            const imgURL = result?.secure_url;

            const UpdatedUser = await User.findByIdAndUpdate({ _id: req.user.userId }, {
                ProfileImageURL: imgURL
            }, { new: true })

            return res.status(201).json({ message: 'Photo Updated Successfully', user: UpdatedUser });


        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }


    } else {

        // ! when user is uploading photo for the first time
        try {
            const localPath = `uploads/${req?.file.filename}`
            console.log(localPath, 'localpath')

            const result = await cloudinaryConfig.uploader.upload(localPath, {
                folder: 'users'
            })
            console.log(result);



            fs.unlinkSync(localPath);

            const imgURL = result?.secure_url;

            const user = await User.findByIdAndUpdate({ _id: req.user.userId }, {
                ProfileImageURL: imgURL
            }, { new: true });

            return res.status(201).json({ message: 'Photo Uploaded Successfully', user });


        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }

    }

})



route.delete('/api/image/:id', authMiddleware, async (req, res) => {



    try {
        const { id } = req.params;

        const tweet = await Tweet.findOne({ _id: id });




        if (!tweet) {
            return res.status(404).json({ message: "tweet not found" })
        }

        const url = tweet.ImageURL;

        await cloudinaryConfig.uploader.destroy(`tweets/` + getPublicId(url));

        res.status(200).json({ message: "Tweet Image Successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }



})









module.exports = route;

