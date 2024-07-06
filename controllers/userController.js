const User = require('../models/User');
const { sendEmail } = require('../utils/email');
const bcrypt = require('bcryptjs');

const generatePassword = (firstName, lastName, mobileNumber) => {
  const password = `${firstName.slice(0, 2)}${lastName.slice(0, 2)}${mobileNumber.slice(-4)}`;
  return password;
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, mobileNumber, email } = req.body;
  try {
    const password = generatePassword(firstName, lastName, mobileNumber);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, mobileNumber, email, password: hashedPassword });
    await user.save();

    await sendEmail(email, 'Account Created', `Welcome ${firstName} ${lastName}. Your login password is: ${password}`);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBio = async (req, res) => {
  const { bio } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { bio }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  const { profilePicture } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { profilePicture }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
