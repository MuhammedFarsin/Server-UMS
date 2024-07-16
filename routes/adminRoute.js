const express = require('express');
const adminController = require('../controllers/adminController');
const adminRoute = express.Router();

// Define a route, for example, to get all users
adminRoute.get('/users', adminController.getUser);
adminRoute.get('/edit-user/:userId',adminController.getUserDetails)
adminRoute.delete('/delete-user/:userId',adminController.deleteUser)
adminRoute.patch('/update-edit-user/:userId',adminController.updateEditUser)
adminRoute.post('/create-user',adminController.adminCreateUser)

module.exports = adminRoute