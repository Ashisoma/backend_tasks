const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'Title is missing!']
        },
        description: {
            type: String,
            required: [true, 'Description is missing!']
        },
        status:{
            type: Boolean,
            required: [true, 'Status is missing']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Tasks', tasksSchema);