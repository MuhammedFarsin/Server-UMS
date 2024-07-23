const jwt = require("jsonwebtoken");
require('dotenv').config()
const jwtAccessToken = process.env.JWT_TOKEN_SECRET;

console.log("JWT Token Secret at module level:", jwtAccessToken); // Log the secret at the module level

const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, jwtAccessToken, (err, user) => {
        if (err) {
          console.log("JWT verification error:", err);
          return res.sendStatus(403); // Invalid token
        }
        req.user = user;
        next(); // Token is valid
      });
    } else {
      return res.sendStatus(401); // No token provided
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authenticateJWT;
