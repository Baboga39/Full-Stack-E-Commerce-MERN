// routes/userRoutes.js
const express = require('express');
const controller = require('../controller')
const router = express.Router();
const middleware= require('../middleware')

router.get('/allUsers',middleware.filter('ADMIN'), controller.userController.allUser)
router.get('/allProduct',middleware.filter('ADMIN'), controller.adminController.getProducts)
router.put('/updateUser',middleware.filter('ADMIN'), controller.userController.updateUser)
router.post('/uploadProduct',middleware.filter('ADMIN'), controller.adminController.uploadProduct)
router.put('/updateProduct',middleware.filter('ADMIN'), controller.adminController.updateProduct)


module.exports = router;