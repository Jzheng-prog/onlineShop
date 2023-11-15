const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller')

router.get('/signUp', authController.getSignUp);

router.get('/login', authController.getLogin);

module.exports = router;