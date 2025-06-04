const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verificationEmail, verifyCode, getUserProfile, getUserProfileThread, addNewThread, getAllCommentOfThread, addNewComment, updateUserProfile, get10LastedActivity, checkUserCookie, logoutUser, getAllCategoryAndTopic, getTopicAndAllThread, getThreadAndAllComment, getNotifications, markNotificationAsRead, markAllNotificationsAsRead, changePassword, getAboutPage, getPrivacyPage, getTermsPage, getHelpPage, search, uploadAvatar, uploadMiddleware, getAllTopics, getAllTags, makeNewThread, uploadFile, getUserAvatar, checkUsernameAvailability, getThreadAttachments, downloadAttachment, chat, getUserById, getAllThreadByUserID, get5MostThreadTag, uploadImg, uploadIma, getAllClubs, getClubByID, createClub, updateClub, deleteClub, getClubsByPresident, editThread, deleteThread, getAllUsers, updateUserRole, deleteUser, getAdminDashboard, getAdminStats, getAllThreads, getAllTopic, getAllActivities, getAllNotifications, createActivity, updateActivity, deleteActivity, createNotification, updateNotification, deleteNotification, getAllTag, createTag, updateTag, deleteTag, getAllFiles, createFile, updateFile, deleteFile, getAllComments, createComment, updateComment, deleteComment, updateUser, createUser, createCategory, updateCategory, deleteCategory, createTopic, updateTopic, deleteTopic, createAdminThread, updateAdminThread, deleteAdminThread } = require('../controllers/homeController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verification', verificationEmail);
router.post('/verify-code', verifyCode);
router.post('/getUserProfile', getUserProfile);
router.get('/getUserProfileThread', getUserProfileThread);
router.post('/addNewThread', addNewThread);
router.get('/getAllCommentOfThread', getAllCommentOfThread);
router.post('/addNewComment', addNewComment);
router.post('/updateUserProfile', updateUserProfile);
router.get('/get10LastedActivity', get10LastedActivity);
router.get('/check-cookie', checkUserCookie);
router.post('/logout', logoutUser);
router.get('/getAllCategoryAndTopic', getAllCategoryAndTopic);
router.get('/getTopicAndAllThread', getTopicAndAllThread);
router.get('/getThreadAndAllComment', getThreadAndAllComment);
router.post('/getNotifications', getNotifications);
router.post('/markNotificationAsRead', markNotificationAsRead);
router.post('/markAllNotificationsAsRead', markAllNotificationsAsRead);
router.post('/changePassword', changePassword);
router.get('/about', getAboutPage);
router.get('/privacy', getPrivacyPage);
router.get('/terms', getTermsPage);
router.get('/help', getHelpPage);
router.get('/search', search);
router.post("/uploadAvatar", uploadMiddleware, uploadAvatar);
router.get("/topics", getAllTopics);
router.get("/tags", getAllTags);
router.post('/threads', uploadFile, makeNewThread);
router.get("/getUserAvatar", getUserAvatar);
router.get('/check-username/:username', checkUsernameAvailability);
router.get('/thread/:threadId/attachments', getThreadAttachments);
router.get('/download/:fileId', downloadAttachment);
router.post('/chatbot', chat);
router.get('/user/:id', getUserById);
router.get('/getAllThread', getAllThreadByUserID);
router.get('/5MostThreadTag', get5MostThreadTag);
router.post("/uploadImage", uploadImg, uploadIma);
// Club routes
router.get('/clubs', getAllClubs);
router.get('/clubs/:id', getClubByID);
router.post('/clubs', createClub);
router.put('/clubs', updateClub);
router.delete('/clubs/:id', deleteClub);
router.get('/clubs/president/:presidentID', getClubsByPresident);

router.put('/thread/:threadId', editThread);
router.delete('/thread/:threadId', deleteThread)

// Admin routes
router.get('/admin/dashboard', getAdminDashboard);
router.get('/admin/stats', getAdminStats);
// Admin User routes
router.get('/admin/users', getAllUsers);
router.post('/admin/users', createUser);
router.put('/admin/users/:id', updateUser);
router.put('/admin/users/:userId/role', updateUserRole);
router.delete('/admin/users/:userId', deleteUser);
// Admin Category routes
router.get('/admin/categories', getAllCategoryAndTopic);
router.post('/admin/categories', createCategory);
router.put('/admin/categories/:id', updateCategory);
router.delete('/admin/categories/:id', deleteCategory);
// Admin Thread routes
router.get('/admin/threads', getAllThreads);
// Admin Topic routes
router.get('/admin/topics', getAllTopic);
router.post('/admin/topics', createTopic);
router.put('/admin/topics/:id', updateTopic);
router.delete('/admin/topics/:id', deleteTopic);

// Admin Club routes
router.get('/admin/clubs', getAllClubs);
router.post('/admin/clubs', createClub);
router.put('/admin/clubs/:id', updateClub);
router.delete('/admin/clubs/:id', deleteClub);

// Admin Activity routes
router.get('/admin/activities', getAllActivities);
router.post('/admin/activities', createActivity);
router.put('/admin/activities/:id', updateActivity);
router.delete('/admin/activities/:id', deleteActivity);

// Admin Notification routes
router.get('/admin/notifications', getAllNotifications);
router.post('/admin/notifications', createNotification);
router.put('/admin/notifications/:id', updateNotification);
router.delete('/admin/notifications/:id', deleteNotification);

// Admin Tag routes
router.get('/admin/tags', getAllTag);
router.post('/admin/tags', createTag);
router.put('/admin/tags/:id', updateTag);
router.delete('/admin/tags/:id', deleteTag);

// Admin File routes
router.get('/admin/files', getAllFiles);
router.post('/admin/files', createFile);
router.put('/admin/files/:id', updateFile);
router.delete('/admin/files/:id', deleteFile);

// Admin Comment routes
router.get('/admin/comments', getAllComments);
router.post('/admin/comments', createComment);
router.put('/admin/comments/:id', updateComment);
router.delete('/admin/comments/:id', deleteComment);

// Admin Thread Management Routes
router.post('/admin/threads', createAdminThread);
router.put('/admin/threads/:id', updateAdminThread);
router.delete('/admin/threads/:id', deleteAdminThread);

module.exports = router;