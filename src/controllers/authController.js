
const User = require('../models/user');
require('dotenv').config();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            res.status(400).json({ message: `All fields are mandatory!` });
        } else {
            // USERNAME NEEDS TO BE UNIQUE 
            const user = await User.findOne({
                where: {
                    username: username
                }
            });
            if (user) {
                res.status(400).json({ message: `User with username already exists!` });
            }

            // HASH PASSWORD BEFORE STORING
            const encryptedPassword = await bcrypt.hash(password, 10);


            const savedUser = await User.create({
                username: username,
                password: encryptedPassword,
            });

            const token = jwt.sign({ userId: savedUser._id }, 'yourSecretKey', { expiresIn: '1h' });


            res.status(200).json({ token: token, userId: savedUser._id });


        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: `All fields are mandatory` })
    } else {
        const user = await User.findOne({

            username: username

        });

        if (user) {
            if (user && (await bcrypt.compare(password, user.password))) {
                const accessToken = jwt.sign({
                    user: {
                        userId: user._id,
                    }
                }, process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "1hr" }
                );
                res.status(200).json({ accessToken });
            } else {
                res.status(400).json({
                    message: `Username or is not password not valid`,
                    username: username,
                    accessToken: accessToken
                })
            }
        }
        else {
            console.log(user)
            res.status(400).json({
                message: `User not found`,

            })
        }

        // Compare with hash pass

    }
})

const logoutUser = (req, res) => {

    res.status(200).json({ message: 'User logged out successfully' });
};

module.exports = {
    loginUser,
    registerUser,

}

