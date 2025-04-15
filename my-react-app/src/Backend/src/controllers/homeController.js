const { insertNewUser } = require('../services/CRUDService')

const registerUser = async (req, res) => {
    const { username, email, displayName, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        await insertNewUser(username, email, displayName, password);
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    registerUser
}