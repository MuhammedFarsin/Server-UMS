const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password, phone } = req.body;
  if (!username || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) {
    return res.status(409).json({ message: "User already exists" });
  }

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const userObject = { username, email, password: hashedPwd, phone };
    const user = await User.create(userObject);
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user.username,
          email: user.email,
        },
      },
      'verysecretkey',
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken, user });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
};

module.exports = { signup, login };
