const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const threeMonths = 3 * 30 * 24 * 60 * 60; 

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

  const { username, password } = req.body;

  // Check if email and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Generate a JWT token
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin, // Include isAdmin in the token payload
          },
        },
          process.env.JWT_TOKEN_SECRET,
        { expiresIn: threeMonths }
      );
     

      // Send the token and user info in the response
      res.status(200).json({ accessToken, user });
    } else {
      // Password did not match
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login };
