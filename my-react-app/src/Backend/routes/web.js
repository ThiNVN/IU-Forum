const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verificationEmail, verifyCode, getUserProfile, getUserProfilePost, addNewPost, getAllCommentOfPost, addNewComment, updateUserProfile, get10LastedActivity, checkUserCookie, logoutUser, getAllSections } = require('../controllers/homeController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verification', verificationEmail);
router.post('/verify-code', verifyCode);
router.post('/getUserProfile', getUserProfile);
router.get('/getUserProfilePost', getUserProfilePost);
router.post('/addNewPost', addNewPost);
router.get('/getAllCommentOfPost', getAllCommentOfPost);
router.post('/addNewComment', addNewComment);
router.post('/updateUserProfile', updateUserProfile);
router.get('/get10LastedActivity', get10LastedActivity);
router.get('/check-cookie', checkUserCookie);
router.post('/logout', logoutUser);
router.get('/getAllSections', getAllSections);
module.exports = router;