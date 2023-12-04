const User = require('../models/user');

const updateUserProfile = async (req, res) => {
  console.log('in profile backend')
  try {
    const { userId, firstName, lastName, institution, location, gender, linkedin, position, birthday, interests, description, profileImage} = req.body;
    let user = await User.findById(userId);

    console.log(userId)
    console.log(user)
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
    user.birthday = birthday;
    user.interests = interests;
    user.description = description;
    user.hasProfile = true; 


    if (req.file) {
      user.userImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype
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
      email: user.email,
      location: user.location,
      age: user.age,
      school: user.school,
      interests: user.interests,
      likes: user.likes,
      matches: user.matches,
      description: user.description,
      userImage: user.userImage ? {
        data: user.userImage.data.toString('base64'),
        contentType: user.userImage.contentType,
      } : null,

    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user info', error: error.message });
  }
};

const likeUser = async (req, res) => {
  try {
    const { userId, likedUserId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.likes.push(likedUserId);
    
    await user.save();

    res.status(200).json({ message: 'User liked successfully' });
  } catch (error) {
    console.error('Error liking user:', error);
    res.status(500).json({ message: 'Error liking user', error: error.message });
  }
};
module.exports = {
  updateUserProfile,
  fetchUserInfo,
  likeUser
};
