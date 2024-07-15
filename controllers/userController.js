const User = require("../models/userModel");

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFields = {};
    if (req.body.username) updatedFields.username = req.body.username;
    if (req.body.email) updatedFields.email = req.body.email;
    if (req.body.phone) updatedFields.phone = req.body.phone;
    if (req.body.profilePic) updatedFields.profilePic = req.body.profilePic;

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { updateProfile };
