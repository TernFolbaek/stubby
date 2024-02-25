const User = require('../models/user');
const Message = require('../models/message'); 
const bcrypt = require('bcryptjs');

const updateUserProfile = async (req, res) => {
  console.log('in profile backend');
  try {
    const {
      userId,
      firstName,
      lastName,
      institution,
      location,
      gender,
      linkedin,
      position,
      interests,
      description,
      age,
    } = req.body;
    let user = await User.findById(userId);

    console.log(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.institution = institution;
    user.location = location;
    user.gender = gender;
    user.linkedin = linkedin;
    user.position = position;
    user.age = age;
    user.interests = interests;
    user.description = description;
    user.hasProfile = true;

    if (req.file) {
      user.userImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    await user.save();

    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const fetchUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userInfo = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      age: user.age,
      institution: user.institution,
      interests: user.interests,
      likes: user.likes,
      matches: user.matches,
      description: user.description,
      userImage: user.userImage
        ? {
            data: user.userImage.data.toString('base64'),
            contentType: user.userImage.contentType,
          }
        : null,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error fetching user info', error: error.message });
  }
};

const likeUser = async (req, res) => {
  try {
    const { userId, likedUserId } = req.body;

    await User.findByIdAndUpdate(userId, { $push: { likes: likedUserId } });

    const likedUser = await User.findById(likedUserId);
    if (likedUser.likes.includes(userId)) {
      await User.findByIdAndUpdate(userId, { $push: { matches: likedUserId } });
      await User.findByIdAndUpdate(likedUserId, { $push: { matches: userId } });

      res.status(200).json({ message: 'Match found!' });
    } else {
      res.status(200).json({ message: 'User liked successfully' });
    }
  } catch (error) {
    console.error('Error liking user:', error);
    res
      .status(500)
      .json({ message: 'Error liking user', error: error.message });
  }
};




const deleteUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }


    await User.updateMany({ matches: userId }, { $pull: { matches: userId } });


    await Message.deleteMany({
      $or: [{ fromUserId: userId }, { toUserId: userId }],
    });


    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res
      .status(500)
      .json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = {
  updateUserProfile,
  fetchUserInfo,
  likeUser,
  deleteUser,
};
