// routes/userRoutes.js
const express = require('express');
const controller = require('../controller')
const router = express.Router();
const middleware= require('../middleware')

router.post("/sign-up",controller.authController.signUp)
router.post("/sign-in",controller.authController.signIn)
router.get("/user-details",middleware.auth,controller.authController.userDetails)
router.get("/logout",controller.authController.logout)


module.exports = router;