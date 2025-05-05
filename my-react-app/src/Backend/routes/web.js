const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verificationEmail, verifyCode, getUserProfile, getUserProfilePost, addNewPost, getAllCommentOfPost, addNewComment } = require('../controllers/homeController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verification', verificationEmail);
router.post('/verify-code', verifyCode);
router.post('/getUserProfile', getUserProfile);
router.get('/getUserProfilePost', getUserProfilePost);
router.post('/addNewPost', addNewPost);
router.get('/getAllCommentOfPost', getAllCommentOfPost);
router.post('/addNewComment', addNewComment);
module.exports = router;