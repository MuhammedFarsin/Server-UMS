const express = require("express");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoute")
const cors = require('cors');
require("dotenv").config()

const mongoose = require("mongoose");

const app = express();
const port = 3003;

const dbUrl = process.env.MONGODB_URL
mongoose.connect(dbUrl);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/admin",adminRoutes)

app.listen(port, () => {
  console.log("app listening on the port 3003");
});
