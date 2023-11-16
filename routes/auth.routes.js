const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller')

router.get('/signUp', authController.getSignUp);

router.post('/signUp', authController.signUp);

router.get('/login', authController.getLogin);

module.exports = router;