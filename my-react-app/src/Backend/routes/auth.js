const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Check username availability
router.get('/check-username/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const existingUser = await User.findOne({ username: username });
        
        if (existingUser) {
            return res.status(409).json({ 
                available: false,
                message: 'Username is already taken' 
            });
        }
        
        res.status(200).json({ 
            available: true,
            message: 'Username is available' 
        });
    } catch (error) {
        console.error('Error checking username:', error);
        res.status(500).json({ 
            available: false,
            message: 'Error checking username availability' 
        });
    }
});

module.exports = router; 