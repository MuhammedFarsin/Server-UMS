const User = require("../models/userModel")

const getUser = async (req,res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = {
    getUser
}