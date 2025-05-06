const User = require('../models/userModel');
const nodemailer = require("nodemailer");
const path = require('path');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });

const registerUser = async (req, res) => {
    const { username, email, displayName, password } = req.body;

    // Check if the required fields are present
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        // Insert the new user into the database
        const userId = await User.insertNewUser(username, email, displayName, password);

        // Respond with success message and user ID
        res.status(201).json({ message: 'User created successfully', userId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { userIdentifier, password } = req.body;

    // Check if the required fields are present
    if (!userIdentifier || !password) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        // Insert the new user into the database
        const userId = await User.checkUserCredentials(userIdentifier, password);
        User.updateUserLastLoginStatus(userId);
        // Respond with success message and user ID
        res.status(201).json({ message: 'Login accept', userId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

//send verification email
const verificationCodes = {};

const verificationEmail = async (req, res) => {
    const { email, username } = req.body;

    const emailSender = process.env.Email;
    const password = process.env.Email_Password;

    // Generate 6-digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Configure your transporter (use your own credentials here)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailSender,
            pass: password // Use App Passwords or OAuth2 for Gmail
        }
    });

    // Email content
    const mailOptions = {
        from: '"IU Forum"',
        to: email,
        subject: 'Your Verification Code',
        text: `Hello ${username},\n\nYour verification code is: ${verificationCode}\n\nThanks!`,
    };

    try {
        await transporter.sendMail(mailOptions);
        verificationCodes[email] = verificationCode;
        res.status(200).json({ message: 'Verification email sent', code: verificationCode });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: 'Failed to send verification email' });
    }
};

//Verify code from user
const verifyCode = (req, res) => {
    const { email, code } = req.body;

    const storedCode = verificationCodes[email];
    console.log(storedCode, code)
    if (!storedCode) {
        return res.status(400).json({ message: 'No verification code found for this email.' });
    }

    if (parseInt(code) === storedCode) {
        // Optionally delete the code after successful verification
        delete verificationCodes[email];
        return res.status(200).json({ message: 'Code verified successfully!' });
    } else {
        return res.status(401).json({ message: 'Invalid verification code.' });
    }
};

const getUserProfile = async (req, res) => {
    const { userId } = req.body;

    try {
        // Get user profile
        const userProfile = await User.getUserByID(userId);
        // Respond with success message and user ID
        res.status(201).json({ message: 'Successful get user profile', userProfile: userProfile[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getUserProfilePost = async (req, res) => {
    const userId = req.query.userId;

    try {
        const { posts, user } = await Post.getProfilePostByUserID(userId);
        // console.log("Profile Post:", posts);
        // console.log("User Info:", user);

        res.status(200).json({
            message: 'Successfully retrieved profile posts',
            posts,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const addNewPost = async (req, res) => {
    const { thread_id, user_id, content, image } = req.body;
    try {
        // Insert the new post into the database
        const newPostResult = await Post.insertNewPost(thread_id, user_id, content, image);
        const newPost = await Post.getPostByID(newPostResult.insertId);
        const userData = await User.getUserByID(newPost[0].user_id);
        // Respond with success message and user ID
        res.status(201).json({ message: 'Post added successfully', newPost, userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllCommentOfPost = async (req, res) => {
    const post_id = req.query.post_id;

    try {
        const comments = await Comment.getCommentByUserID(post_id);
        // console.log("Comments:", comments);
        res.status(200).json({
            message: 'Successfully retrieved all comments of post',
            comments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const addNewComment = async (req, res) => {
    const { post_id, user_id, parent_cmt_id, content } = req.body;
    try {
        // Insert the new comment into the database
        const CommentResult = await Comment.insertNewCommnent(post_id, user_id, parent_cmt_id, content);
        const newComment = await Comment.getCommentByID(CommentResult.insertId);
        const userData = await User.getUserByID(newComment[0].user_id);
        // Respond with success message and user ID
        res.status(201).json({ message: 'Comment added successfully', newComment, userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verificationEmail,
    verifyCode,
    getUserProfile,
    getUserProfilePost,
    addNewPost,
    getAllCommentOfPost,
    addNewComment
};
