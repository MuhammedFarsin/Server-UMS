const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema  = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    profilePic : {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;