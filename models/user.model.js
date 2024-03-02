const mongoose = require("mongoose")
const userSchema = mongoose.Schema (
    {
        userName : {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 100,
        },

        email : {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 100,
            unique: true,
        },

        passwordHash : {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 100,
            unique: true,
        },
    }
)

const User = mongoose.model("User", userSchema)
module.exports = User;