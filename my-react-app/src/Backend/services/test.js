const { getAllUser } = require('../models/userModel'); // Correct the path as necessary

const testGetAllUser = async () => {
    try {
        const users = await getAllUser();
        console.log('Fetched Users:', users);
    } catch (err) {
        console.error('Error fetching users:', err);
    }
};

testGetAllUser();
