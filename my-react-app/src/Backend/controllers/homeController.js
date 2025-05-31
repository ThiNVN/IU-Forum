const User = require('../models/userModel');
const nodemailer = require("nodemailer");
const path = require('path');
const Thread = require('../models/threadModel');
const Comment = require('../models/commentModel');
const Activity = require('../models/activityModel');
const Notification = require('../models/notificationModel');
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });
let cookieParser = require('cookie-parser');
const userCredentials = require('../models/userCredentialsModel');
const { get } = require('http');
const Category = require('../models/categoryModel')
const Topic = require('../models/TopicModel');
const UserCredentials = require('../models/userCredentialsModel');
const Search = require('../models/searchModel');
const Tag = require('../models/tagModel');
const ThreadTag = require('../models/thread_tagModel');
const FollowTopic = require('../models/followTopicModel');
const File = require('../models/fileModel');
const multer = require("multer");
const fs = require("fs");
const axios = require('axios');

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
        const getEmail = await userCredentials.getUserCredentialsByID(getUser[0].ID);
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
        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: 'Failed to send verification email' });
    }
};

//Verify code from user
const verifyCode = async (req, res) => {
    var { email, code, identifierType, UID } = req.body;
    if (identifierType === "username") {
        const getUser = await User.getUserByUserName(email);
        if (!getUser || getUser.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const getEmail = await userCredentials.getUserCredentialsByID(getUser[0].ID);
        if (!getEmail || getEmail.length === 0) {
            return res.status(404).json({ message: 'Email not found for user' });
        }
        email = getEmail[0].email;
    }

    console.log(email);
    const storedCode = verificationCodes[email];
    console.log(storedCode, code);
    if (!storedCode) {
        return res.status(400).json({ message: 'No verification code found for this email.' });
    }

    if (parseInt(code) === storedCode) {
        // Optionally delete the code after successful verification
        delete verificationCodes[email];
        // Successful login
        await User.updateUserLastLoginStatus(UID);
        res.cookie('user_id', UID, {
            httpOnly: true,
            secure: false, // change to true in production
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000
        });

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
        if (!userProfile || userProfile.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = userProfile[0];
        user.displayName = user.full_name; // Add displayName for frontend compatibility
        res.status(201).json({ message: 'Successful get user profile', userProfile: user });
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
    const { topic_id, user_id, title, image, description, content } = req.body;
    try {
        // Insert the new post into the database
        const newThreadResult = await Thread.insertNewThread(topic_id, user_id, title, image, description, content);
        const newThread = await Thread.getThreadByID(newThreadResult.insertId);
        const userData = await User.getUserByID(newThread[0].user_id);
        //Make new activity record
        const activity_type = "post";
        var ACdescription = "";
        if (topic_id == null) {
            ACdescription = "User posted a new profile thread";
        } else {
            const result = Topic.getTopicByID(topic_id);
            ACdescription = "User posted a new thread in topic " + result[0].title;
        }
        await Activity.insertActivity(user_id, activity_type, ACdescription)
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
        const comments = await Comment.getCommentsByThreadID(thread_id);
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
    const { thread_id, user_id, content } = req.body;
    try {
        // Insert the new comment into the database
        const CommentResult = await Comment.insertComment(thread_id, user_id, content);
        const newComment = await Comment.getCommentByID(CommentResult.insertId);
        const userData = await User.getUserByID(newComment[0].user_id);

        const thread = await Thread.getThreadByID(thread_id);
        const topic = await Topic.getTopicByID(thread.ID);
        //Make new activity record
        var description = "";
        if (!topic || topic.length === 0) {
            description = "User made a new comment in a profile thread";
        } else {
            description = "User made a new comment in a thread '" + thread.title + "' in topic '" + topic[0].title + "'";
        }
        const activity_type = "comment";

        await Activity.insertActivity(user_id, activity_type, description)

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
        // Only allow updating displayName (full_name) and other editable fields, not username
        const isOk = await User.updateDisplayNameAndProfile(
            updatedProfile.id,
            updatedProfile.displayName,
            updatedProfile.title,
            updatedProfile.location,
            updatedProfile.occupation,
            updatedProfile.website,
            updatedProfile.socialLinks?.Twitter,
            updatedProfile.socialLinks?.LinkedIn,
            updatedProfile.biography
        );
        res.status(201).json('Successful update profile');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const get10LastedActivity = async (req, res) => {
    const userId = req.query.userId;

    try {
        const activities = await Activity.getLatestActivities(userId);
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

const getAllCategoryAndTopic = async (req, res) => {
    try {
        const categories = await Category.getAllCategories();
        const result = [];

        for (const c of categories) {
            const topics = await Topic.getTopicsByCategoryID(c.ID);

            const listTopics = await Promise.all(topics.map(async (topic) => {
                const countThreads = await Thread.countThreadByTopicID(topic.ID);
                return {
                    id: topic.ID,
                    title: topic.title,
                    description: topic.description,
                    threadCount: countThreads,
                    lastActivity: topic.last_activity
                };
            }));

            result.push({
                id: c.ID,
                title: c.name,
                description: c.description,
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


const getTopicAndAllThread = async (req, res) => {
    try {
        const topics = await Topic.getAll();

        const result = [];

        for (const t of topics) {
            const threads = await Thread.getNormalThreadByTopicID(t.ID);

            const listThreads = await Promise.all(threads.map(async (thread) => {
                const countReply = await Comment.countCommentByThreadID(thread.ID);
                const author = await User.getUserByID(thread.user_id);
                return {
                    id: thread.ID,
                    title: thread.title,
                    author: author[0].username,
                    user_id: thread.user_id,
                    createdAt: thread.create_at,
                    lastActivity: thread.last_activity,
                    replyCount: countReply === 0 ? (thread.responses) : (countReply - 1),
                    description: thread.description
                };
            }));

            result.push({
                title: t.title,
                description: t.description,
                threads: listThreads
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

const getThreadAndAllComment = async (req, res) => {
    const thread_id = req.query.threadId;
    try {
        const thread = await Thread.getThreadByID(thread_id);
        const threadAuthor = await User.getUserByID(thread[0].user_id);

        if (!thread || thread.length === 0) {
            return res.status(404).json({ message: 'Thread not found' });
        }

        const comments = await Comment.getCommentsByThreadID(thread[0].ID);

        const listComments = await Promise.all(comments.map(async (comment) => {
            return {
                id: comment.ID,
                author: comment.username,
                content: comment.content,
                createdAt: comment.create_at,
                avatar: comment.avatar
            };
        }));

        const result = {
            id: thread[0].ID,
            content: thread[0].content,
            author: threadAuthor[0].username,
            createdAt: thread[0].create_at,
            title: thread[0].title,
            comments: listComments
        };

        res.status(200).json({
            message: 'Successfully retrieved thread and comments',
            result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getNotifications = async (req, res) => {
    const { userId } = req.body;

    try {
        const notifications = await Notification.getNotificationsByUserID(userId);

        // Format notifications for frontend
        const formattedNotifications = notifications.map(notification => ({
            id: notification.ID,
            type: notification.new_message ? 'message' : 'notification',
            content: notification.message,
            timestamp: notification.create_at,
            read: notification.is_read === 1,
            fromUser: {
                username: notification.from_username,
                avatar: notification.from_avatar
            },
            threadId: notification.thread_id,
            commentId: notification.comment_id
        }));

        res.status(200).json({
            message: 'Successfully retrieved notifications',
            notifications: formattedNotifications
        });
    } catch (err) {
        console.error('Error getting notifications:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const markNotificationAsRead = async (req, res) => {
    const { notificationId } = req.body;

    try {
        const success = await Notification.markAsRead(notificationId);
        if (success) {
            res.status(200).json({ message: 'Notification marked as read' });
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (err) {
        console.error('Error marking notification as read:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const markAllNotificationsAsRead = async (req, res) => {
    const { userId } = req.body;

    try {
        const success = await Notification.markAllAsRead(userId);
        if (success) {
            res.status(200).json({ message: 'All notifications marked as read' });
        } else {
            res.status(404).json({ message: 'No notifications found' });
        }
    } catch (err) {
        console.error('Error marking all notifications as read:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const changePassword = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
    try {
        // Get current user credentials
        const credentialsArr = await UserCredentials.getUserCredentialsByID(userId);
        if (!credentialsArr || credentialsArr.length === 0) {
            return res.status(404).json({ message: 'User credentials not found' });
        }
        const credentials = credentialsArr[0];
        // Verify current password
        const bcrypt = require('bcrypt');
        const isMatch = await bcrypt.compare(currentPassword, credentials.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        // Update to new password
        await UserCredentials.changePassword(userId, newPassword);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAboutPage = (req, res) => {
    res.status(200).json({
        title: 'About IU Forum',
        content: {
            mission: 'Our mission is to create a safe, engaging, and informative space where the IU community can connect, share knowledge, and discuss topics relevant to campus life and beyond.',
            features: [
                'Discussion forums for various academic departments',
                'Student life and campus events',
                'Academic support and resources',
                'Career development and networking',
                'Community engagement opportunities'
            ],
            contact: 'support@iuforum.edu'
        }
    });
};

const getPrivacyPage = (req, res) => {
    res.status(200).json({
        title: 'Privacy Policy',
        lastUpdated: new Date().toISOString(),
        content: {
            informationCollected: [
                'Account information (username, email, password)',
                'Profile information (display name, avatar)',
                'Content you post on the forum',
                'Communication preferences'
            ],
            informationUsage: [
                'Provide and maintain our services',
                'Process your transactions',
                'Send you technical notices and support messages',
                'Communicate with you about products, services, and events',
                'Monitor and analyze trends and usage'
            ],
            contact: 'privacy@iuforum.edu'
        }
    });
};

const getTermsPage = (req, res) => {
    res.status(200).json({
        title: 'Terms of Service',
        lastUpdated: new Date().toISOString(),
        content: {
            userConduct: [
                'Provide accurate and complete information',
                'Maintain the security of your account',
                'Not engage in any illegal or harmful activities',
                'Respect other users and their rights',
                'Not post spam or malicious content'
            ],
            contentGuidelines: [
                'Is illegal, harmful, or threatening',
                'Infringes on intellectual property rights',
                'Contains hate speech or discrimination',
                'Is spam or commercial solicitation',
                'Contains personal information of others'
            ],
            contact: 'terms@iuforum.edu'
        }
    });
};

const getHelpPage = (req, res) => {
    res.status(200).json({
        title: 'Help Center',
        content: {
            gettingStarted: {
                title: 'Creating an Account',
                steps: [
                    'Click the "Register" button in the top right corner',
                    'Fill in your email, username, and password',
                    'Verify your email address',
                    'Complete your profile'
                ]
            },
            commonIssues: {
                forgotPassword: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.',
                accountLocked: 'If your account is locked, contact support with your username and email address.',
                technicalProblems: 'Try clearing your browser cache and cookies, or try a different browser.'
            },
            contact: {
                email: 'support@iuforum.edu',
                hours: 'Monday-Friday, 9 AM - 5 PM EST',
                responseTime: 'Within 24 hours'
            }
        }
    });
};

const search = async (req, res) => {
    const { searchText, searchType, username } = req.query;
    console.log("Received search request:", searchText, searchType, username);

    try {
        let result;

        switch (searchType) {
            case 'category':
                result = await Search.searchByCategory(searchText);
                break;

            case 'topic':
                result = await Search.searchByTopic(searchText);
                break;

            case 'tag':
                result = await Search.searchByTag(searchText);
                break;

            case 'thread title':
                result = await Search.searchByThreadTitle_User(searchText, username || '');
                break;

            case 'user':
                result = await Search.searchByUser(searchText);
                break;

            default:
                return res.status(400).json({ message: 'Invalid search type' });
        }

        return res.status(200).json({
            message: 'Successfully retrieved results',
            result
        });

    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

const uploadDir = path.join(__dirname, "../../../public/img/avt");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save in folder public
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, "avatar-" + uniqueSuffix + ext);
    },
});

const upload = multer({ storage });

const uploadAvatar = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
    const userId = req.body.userId;
    const fullPath = req.file.path;
    const filename = "/img/avt/" + path.basename(fullPath);

    try {
        const result = await User.getAvatar(userId); // Should return { avatar: "avatar-name.png" }
        const oldAvatar = result.avatar;

        if (oldAvatar && oldAvatar !== "/img/avt/guest_avatar.png") {
            const oldAvatarPath = path.join(__dirname, "../../../public", oldAvatar);
            // Check if file exists then delete
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
                console.log(`Deleted old avatar: ${oldAvatar}`);
            }
        }

        const updateResult = await User.updateAvatar(filename, userId);

        res.status(200).json({
            message: "Upload successful",
            filePath: `/img/avt/${filename}`,
            filename,
            updateResult
        });

    } catch (error) {
        console.error("Error uploading avatar:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.getAll();

        // Filter only the needed fields
        const filteredTopics = topics.map(topic => ({
            id: topic.ID,
            title: topic.title,
            category_id: topic.category_id
        }));

        res.status(200).json({
            message: 'Successfully retrieved topics',
            topics: filteredTopics
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.getAll();
        // Filter only the needed fields
        const filteredTags = tags.map(tag => ({
            id: tag.ID,
            name: tag.name,
        }));
        res.status(200).json({
            message: 'Successfully retrieved topics',
            tags: filteredTags
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../public/uploads'));
    },
    filename: function (req, file, cb) {
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(originalName); // Lấy phần mở rộng
        const baseName = path.basename(originalName, fileExtension); // Lấy tên file gốc
        cb(null, `${uniqueSuffix}-${baseName}${fileExtension}`);
    }
});

const uploadFile = multer({ storage: storageFile });

const makeNewThread = async (req, res) => {
    try {
        const {
            topic_id,
            user_id,
            title,
            description,
            content,
            tags,
            follow
        } = req.body;

        // Files uploaded
        const uploadedFiles = req.files.map(file => ({
            filename: file.filename,
            path: `/uploads/${file.filename}`,
            originalName: file.originalname,
        }));

        // Log everything for debug
        console.log('Thread details:', {
            topic_id,
            user_id,
            title,
            description,
            content,
            tags: JSON.parse(tags),
            follow: follow === 'true',
            files: uploadedFiles
        });
        //Save thread
        const threadResult = await Thread.insertNewThread(topic_id, user_id, title, description, content);
        //insert new rows in thread_tag table (one thread and many tags)
        console.log(tags);
        for (const tagId of JSON.parse(tags)) {
            await ThreadTag.insertThreadTag(threadResult.insertId, tagId);
        }
        //insert follow topic
        if (follow) {
            await FollowTopic.insertFollowTopic(threadResult.insertId, user_id);
        }
        //insert to file table
        for (const file of uploadedFiles) {
            await File.insertFile(user_id, file.path, threadResult.insertId);
        }
        //Check if tag existed(Now only existed tag will be add)
        // const existedTags = await Tag.getAll();
        // const existingTagIds = existedTags.map(tag => tag.ID);
        // const submittedTags = JSON.parse(tags); // assuming it's an array of tag objects with `.name`
        // const existingTags = submittedTags.filter(tagId => existingTagIds.includes(tagId));
        // const newTags = submittedTags.filter(tagId => !existingTagIds.includes(tagId));
        // console.log('New tags to create:', newTags);
        // console.log('Existing tags:', existingTags);
        // TODO: Save the thread, tags, follow status, and file metadata in the DB

        res.status(201).json({
            message: 'Thread created successfully',
            threadId: threadResult.insertId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserAvatar = async (req, res) => {
    const username = req.query.username;

    try {
        const useravatar = await User.getUserAvatarByUsername(username);

        res.status(200).json({
            message: 'Successfully retrieved profile posts',
            useravatar
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const checkUsernameAvailability = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.getUserByUserName(username);
        if (user && user.length > 0) {
            return res.status(400).json({ message: 'Username is already taken' });
        }
        return res.status(200).json({ message: 'Username is available' });
    } catch (err) {
        console.error('Error checking username:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getThreadAttachments = async (req, res) => {
    const { threadId } = req.params;
    try {
        const files = await File.getFilesByThreadId(threadId);
        res.status(200).json({ attachments: files });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const downloadAttachment = async (req, res) => {
    const { fileId } = req.params;
    try {
        const files = await File.getFileById(fileId);
        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }
        const file = files[0];
        const filePath = path.join(__dirname, '../../../public', file.link);
        res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(file.originalName)}`);
        res.download(filePath, file.originalName);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const chat = async (req, res) => {
    try {
        const { message } = req.body;
        const ngrokUrl = process.env.NGROK_URL;
        
        console.log('Request body:', req.body);
        console.log('NGROK_URL from env:', ngrokUrl);
        
        if (!ngrokUrl) {
            throw new Error('NGROK_URL is not defined in environment variables');
        }

        if (!message) {
            throw new Error('Message is required in request body');
        }

        // Format the request to match the expected format
        const requestPayload = {
            question: message
        };

        console.log('Sending request to:', ngrokUrl);
        console.log('Request payload:', requestPayload);
        
        // Make request to your ngrok endpoint
        const modelResponse = await axios.post(ngrokUrl + '/ask', requestPayload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Raw response from model:', modelResponse.data);

        // Extract the answer from the response
        let responseText;
        if (modelResponse.data.answer) {
            responseText = modelResponse.data.answer;
        } else if (typeof modelResponse.data === 'string') {
            responseText = modelResponse.data;
        } else if (modelResponse.data.response) {
            responseText = modelResponse.data.response;
        } else if (modelResponse.data.message) {
            responseText = modelResponse.data.message;
        } else {
            responseText = JSON.stringify(modelResponse.data);
        }

        res.status(200).json({
            message: 'Success',
            response: responseText
        });
    } catch (err) {
        console.error('Chat error details:', {
            message: err.message,
            code: err.code,
            response: err.response?.data,
            status: err.response?.status
        });
        
        res.status(500).json({ 
            message: 'Server error',
            error: err.message,
            details: err.response?.data || 'No additional details available'
        });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const userProfile = await User.getUserByID(userId);
        if (!userProfile || userProfile.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ userProfile: userProfile[0] });
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
    getAllCategoryAndTopic,
    getTopicAndAllThread,
    getThreadAndAllComment,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    changePassword,
    getAboutPage,
    getPrivacyPage,
    getTermsPage,
    getHelpPage,
    search,
    uploadAvatar,
    uploadMiddleware: upload.single("image"),
    getAllTopics,
    getAllTags,
    makeNewThread,
    uploadFile: uploadFile.array('files'),
    getUserAvatar,
    checkUsernameAvailability,
    getThreadAttachments,
    downloadAttachment,
    chat,
    getUserById
};
