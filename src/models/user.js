const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is missing!']
        },
        password: {
            type: String,
            required: [true, 'Password is missing!']
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema);