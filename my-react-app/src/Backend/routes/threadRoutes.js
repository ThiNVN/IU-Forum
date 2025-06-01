// const express = require('express');
// const router = express.Router();
// const Thread = require('../models/threadModel');
// const auth = require('./auth');

// // Modify thread
// router.put('/:threadId', auth, async (req, res) => {
//   try {
//     const { threadId } = req.params;
//     const { title, content, description } = req.body;
//     const userId = req.user.id;

//     // Get the thread to check ownership
//     const thread = await Thread.getThreadByID(threadId);
//     if (!thread) {
//       return res.status(404).json({ message: 'Thread not found' });
//     }

//     // Check if user is the thread owner
//     if (thread[0].user_id !== userId) {
//       return res.status(403).json({ message: 'Not authorized to modify this thread' });
//     }

//     // Update the thread
//     const result = await Thread.updateThread(
//       threadId,
//       thread[0].topic_id,
//       userId,
//       title,
//       thread[0].image,
//       thread[0].responses,
//       thread[0].views,
//       description,
//       content
//     );

//     res.json({ message: 'Thread updated successfully', result });
//   } catch (error) {
//     console.error('Error updating thread:', error);
//     res.status(500).json({ message: 'Error updating thread' });
//   }
// });

// // Delete thread
// router.delete('/:threadId', auth, async (req, res) => {
//   try {
//     const { threadId } = req.params;
//     const userId = req.user.id;

//     // Get the thread to check ownership
//     const thread = await Thread.getThreadByID(threadId);
//     if (!thread) {
//       return res.status(404).json({ message: 'Thread not found' });
//     }

//     // Check if user is the thread owner
//     if (thread[0].user_id !== userId) {
//       return res.status(403).json({ message: 'Not authorized to delete this thread' });
//     }

//     // Delete the thread
//     const result = await Thread.deleteThread(threadId);
//     if (result) {
//       res.json({ message: 'Thread deleted successfully' });
//     } else {
//       res.status(500).json({ message: 'Error deleting thread' });
//     }
//   } catch (error) {
//     console.error('Error deleting thread:', error);
//     res.status(500).json({ message: 'Error deleting thread' });
//   }
// });

// module.exports = router; 