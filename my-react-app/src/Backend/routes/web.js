const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verificationEmail, verifyCode } = require('../controllers/homeController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verification', verificationEmail);
router.post('/verify-code', verifyCode);

module.exports = router;