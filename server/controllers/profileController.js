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

const fetchUserPortfolio = async (req, res) => {
  try{
    const {userId} = req.body
    let user = await User.findById(userId)
  } catch{

  }
 

}

module.exports = {
  updateUserProfile,
  fetchUserPortfolio
};
