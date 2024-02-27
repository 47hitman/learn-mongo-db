const { Timestamp } = require('bson')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "kosong nama"]
        },
        password: {
            type: String,
            required: [true, "pass kosong"]
        },
    },
    {
        timestamps: true
    }
)

const user = mongoose.model('user', userSchema)

module.exports = user;