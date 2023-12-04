const User = require('../models/user');

const fetchUsersForExploration = async (req, res) => {
    try {
        const currentUserId = req.params.userId;
  
        const users = await User.find({ _id: { $ne: currentUserId } })
            .select('-password -sensitiveData')
            .limit(10);

        const usersWithBase64Images = users.map(user => {
            if (user.userImage && user.userImage.data) {
                const base64Image = Buffer.from(user.userImage.data).toString('base64');
                user.userImage = `data:${user.userImage.contentType};base64,${base64Image}`;
            }
            return user;
        });

        res.status(200).json(usersWithBase64Images);
    } catch (error) {
        console.error('Error fetching users for exploration:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

module.exports = { fetchUsersForExploration };
