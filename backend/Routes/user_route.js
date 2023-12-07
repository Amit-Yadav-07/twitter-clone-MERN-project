
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


route.get('/api/currentUser', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.userId }).select('-password');
        console.log("coming from user", user);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


route.post('/api/login', async (req, res) => {



    const { email, password } = req.body;

    try {


        if (!email || !password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // ! if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        // ! is password correct

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }


        const token = JWT.sign(
            {
                userId: user._id,
                user: { name: user.name }
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME }
        )

        res.status(200).json({ message: "Login Successful", token })


    } catch (error) {
        console.log('error block')
        res.status(500).json({ message: error.message })
    }


})


// --------------------------Register API------------------------------



route.post('/api/register', async (req, res) => {

    try {
        let { name, username, email, password } = req.body;


        if (!name || !password || !email || !username) {

            return res.status(400).json({ message: 'All the Fields are Mandatory' })
        }


        // ! check if user exists already

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(401).json({ message: "user already exists" });
        }

        let hashedPassword = await bcrypt.hash(password, 10)

        console.log(hashedPassword);

        const user = await User.create({ name, email, password: hashedPassword, username });

        const jwtToken = JWT.sign(
            { userId: this._id, name: this.name },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_LIFETIME,
            });

        res.status(201).json({ token: jwtToken, user: user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


route.get('/api/users/:id', async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.id })
        console.log(user);
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



route.patch('/api/users/follow/:stalker/:victim', authMiddleware, async (req, res) => {


    try {
        const { stalker, victim } = req.params;
        console.log(req.params)


        const victimUser = await User.findOne({ _id: victim });
        if (!victimUser) {
            return res.status(404).json({ message: "no user found" });
        }
        const stalkerUser = await User.findOne({ _id: stalker });
        if (!stalkerUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // search victim user and check its Followers array if it contains stalker user

        if (!victimUser?.Followers?.includes(stalker)) {
            await User.updateOne({
                _id: victim
            },
                { $push: { Followers: stalker } }, { new: true }
            )

            await User.updateOne({
                _id: stalker
            }, { $push: { Following: victim } }, { new: true })
            return res.status(201).json({ message: "User Followed Successfully" });
        } else {
            await User.updateOne({
                _id: victim
            },
                { $pull: { Followers: stalker } }, { new: true }
            )
            await User.updateOne({
                _id: stalker
            }, { $pull: { Following: victim } }, { new: true })
            return res.status(200).json({ message: "User UnFollowed Successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})





module.exports = route;