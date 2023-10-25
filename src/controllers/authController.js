
const User = require('../models/user');

const asyncHandler = require('express-async-handler');

const jwt = require('jsonwebtoken');

const registerUser = asyncHandler( async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password ) {
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

        await User.create({
            username: username,
            password: encryptedPassword,
        })
            .then((user) => {
                res.status(201).json({ 
                    username: user.username, 
                    email: user.email, 
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

const loginUser = asyncHandler (async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: `All fields are mandatory` })
    } else {
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        // Compare with hash pass
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user:{
                    username: user.username,
                }
            }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"1hr"}
            );
            res.status(200).json({ accessToken });
        }else{
            res.status(400).json({message:`Username or is not password not valid`})
        }
    }
})

const logoutUser = (req, res) => {
   
    res.status(200).json({ message: 'User logged out successfully' });
};

module.exports = {
    loginUser,
    registerUser,

}

