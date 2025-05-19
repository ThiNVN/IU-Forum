const User = require('../models/userModel');
const nodemailer = require("nodemailer");
const path = require('path');
const Thread = require('../models/threadModel');
const Comment = require('../models/commentModel');
const Activity = require('../models/activityModel');
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });
let cookieParser = require('cookie-parser');
const userCredentials = require('../models/userCredentialsModel');
const { get } = require('http');
const Category = require('../models/categoryModel')
const Topic = require('../models/TopicModel');

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
        const result = await User.checkUserCredentials(userIdentifier, password);

        if (typeof result === 'object' && result.status === 1) {
            // Successful login
            await User.updateUserLastLoginStatus(result.userId);
            res.cookie('user_id', result.userId, {
                httpOnly: true,
                secure: false, // change to true in production
                sameSite: 'lax',
                path: '/',
                maxAge: 24 * 60 * 60 * 1000
            });
            return res.status(200).json({ message: 'Login accepted', userId: result.userId });
        }

        // Handle specific failures
        switch (result) {
            case 0:
                return res.status(401).json({ message: 'Incorrect password.' });
            case 2:
                return res.status(500).json({ message: 'Internal authentication error.' });
            case 3:
                return res.status(404).json({ message: 'User not found.' });
            default:
                return res.status(400).json({ message: 'Unknown authentication failure.' });
        }

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

//send verification email
const verificationCodes = {};

const verificationEmail = async (req, res) => {
    var { email, username, identifierType } = req.body;
    if (identifierType === "username") {
        username = email;
        const getUser = await User.getUserByUserName(email);
        const getEmail = await userCredentials.getUserCredentialsByUserID(getUser[0].ID);
        email = getEmail[0].email;
    } else if (identifierType === "email") {
        const getUser = await User.getUserByUserName(email);
        username = getUser[0].username;
    }


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
const verifyCode = async (req, res) => {
    var { email, code, identifierType } = req.body;
    if (identifierType === "username") {
        const getUser = await User.getUserByUserName(email);
        const getEmail = await userCredentials.getUserCredentialsByUserID(getUser[0].ID);
        email = getEmail[0].email;
    }
    console.log(email)
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

const getUserProfileThread = async (req, res) => {
    const userId = req.query.userId;

    try {
        const { threads, user } = await Thread.getProfileThreadByUserID(userId);
        // console.log("Profile Post:", posts);
        // console.log("User Info:", user);

        res.status(200).json({
            message: 'Successfully retrieved profile posts',
            threads,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const addNewThread = async (req, res) => {
    const { topic_id, user_id, content, image } = req.body;
    try {
        // Insert the new post into the database
        var main_comment_id = null;
        const newThreadResult = await Thread.insertNewThread(topic_id, user_id, main_comment_id, content, image);
        var parent_cmt_id = null;
        const comment = await Comment.insertNewCommnent(newThreadResult.insertId, user_id, parent_cmt_id, content);
        await Thread.updateThreadMainComment(newThreadResult.insertId, comment.insertId);
        const newThread = await Thread.getThreadByID(newThreadResult.insertId);
        const userData = await User.getUserByID(newThread[0].user_id);
        //Make new activity record
        const activity_type = "post";
        var description = "";
        if (topic_id == null) {
            description = "User posted a new profile post";
        } else {
            description = "User posted a new post in thread";//add name of thread
        }
        await Activity.insertNewActivity(user_id, activity_type, description)
        // Respond with success message and user ID
        res.status(201).json({ message: 'Post added successfully', newThread, userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllCommentOfThread = async (req, res) => {
    const thread_id = req.query.thread_id;

    try {
        const comments = await Comment.getCommentByUserID(thread_id);
        res.status(200).json({
            message: 'Successfully retrieved all comments of thread',
            comments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const addNewComment = async (req, res) => {
    const { thread_id, user_id, parent_cmt_id, content } = req.body;
    try {
        // Insert the new comment into the database
        const CommentResult = await Comment.insertNewCommnent(thread_id, user_id, parent_cmt_id, content);
        const newComment = await Comment.getCommentByID(CommentResult.insertId);
        const userData = await User.getUserByID(newComment[0].user_id);

        const thread = await Thread.getThreadByID(thread_id);
        const topic = await Topic.getTopicByID(thread.ID)
        //Make new activity record
        const activity_type = "comment";
        const description = "User made a new comment in a thread in " + topic.title;
        await Activity.insertNewActivity(user_id, activity_type, description)

        // Respond with success message and user ID
        res.status(201).json({ message: 'Comment added successfully', newComment, userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUserProfile = async (req, res) => {
    const updatedProfile = req.body;

    try {
        // Get user profile
        const isOk = await User.updateUser(updatedProfile.id, updatedProfile.username, updatedProfile.title, updatedProfile.location, updatedProfile.occupation, updatedProfile.website, updatedProfile.socialLinks.Twitter, updatedProfile.socialLinks.LinkedIn, updatedProfile.biography);
        // Respond with success message and user ID
        res.status(201).json('Successful update profile');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

}

const get10LastedActivity = async (req, res) => {
    const userId = req.query.userId;

    try {
        const activities = await Activity.get10ActivityByUserID(userId);
        // console.log("Profile Post:", posts);
        // console.log("User Info:", user);

        res.status(200).json({
            message: 'Successfully retrieved 10 lasted activity',
            activities
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const checkUserCookie = async (req, res) => {
    try {
        const userId = req.cookies.user_id;
        if (!userId) {
            return res.status(401).json({ message: 'No user cookie found' });
        }

        // Verify user exists in the database
        const user = await User.getUserByID(userId); // Ensure this method exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid user cookie' });
        }

        // Return userId if valid
        res.status(200).json({ message: 'User cookie valid', userId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


//Delete cookies when log out
const logoutUser = (req, res) => {
    try {
        // Clear the user_id cookie
        res.clearCookie('user_id', {
            httpOnly: true,
            secure: false, // Set to false for local development
            sameSite: 'lax',
            path: '/' // Match the path used when setting the cookie
        });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllSections = async (req, res) => {
    try {
        const categories = await Category.getAllCategories();
        const result = [];

        for (const c of categories) {
            const topics = await Topic.getTopicsByCategoryID(c.ID);

            const listTopics = await Promise.all(topics.map(async (topic) => {
                const countTopics = await Topic.countTopicByCategoryID(c.ID);
                const countThreads = await Thread.countThreadByTopicID(topic.ID);
                return {
                    id: topic.ID,
                    title: topic.title,
                    description: topic.description,
                    count: countTopics,
                    posts: countThreads
                };
            }));

            result.push({
                id: c.ID,
                title: c.name,
                topics: listTopics
            });
        }
        res.status(200).json({
            message: 'Successfully retrieved all sections',
            result
        });
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
    getUserProfileThread,
    addNewThread,
    getAllCommentOfThread,
    addNewComment,
    updateUserProfile,
    get10LastedActivity,
    checkUserCookie,
    logoutUser,
    getAllSections
};
