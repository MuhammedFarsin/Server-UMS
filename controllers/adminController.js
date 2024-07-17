const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(userId)

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(409).json({ message: "User Not Found...!" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const updateEditUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, phone, profilePic } = req.body;

    const updateduserData = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        phone,
        profilePic,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateduserData) {
      return res.status(404).json({ message: "User not found...!" });
    }

    res.status(200).json(updateduserData);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found...!" });
    }

    res.status(200).json({ message: "User deleted Successfully..." });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
const adminCreateUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const exixtingUser = await User.findOne({ email });

    if (exixtingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "User Successfully Added..." });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  getUser,
  getUserDetails,
  updateEditUser,
  deleteUser,
  adminCreateUser,
};
