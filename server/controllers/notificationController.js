const User = require('../models/user');

const exploreTrue = async (req, res) => {
  try {
    const matchId  = req.params.selectedId;

    const user = await User.findOneAndUpdate(
      { _id: matchId },
      { $set: { explored: true } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUnexploredMatches = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate(
      'matches',
      'username explored'
    );

    const unexploredMatches = user.matches.filter((match) => !match.explored);


    const unexploredUsernames = unexploredMatches
      .map((match) => match.username)
      .join(', ');

    const message = `You have yet to send your first message to ${unexploredUsernames}`;

    res.json({ message, unexploredMatches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  exploreTrue,
  getUnexploredMatches,
};
