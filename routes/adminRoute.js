const express = require('express');
const adminController = require('../controllers/adminController');
const adminRoute = express.Router();

// Define a route, for example, to get all users
adminRoute.get('/users', adminController.getUser);

module.exports = adminRoute