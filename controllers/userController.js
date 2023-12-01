const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate the request body
  if (!email || !password) {
    return res.status(400).json({ message: 'Incomplete user information' });
  }

  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ user: savedUser, message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res
      .status(500)
      .json({ message: 'Failed to create user', error: error.message });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate the request body
  if (!email || !password) {
    return res.status(400).json({ message: 'Incomplete user information' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      'RANDOM_TOKEN_SECRET',
      { expiresIn: '1h' },
    );

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's role
    user.role = role;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to update user role', error: error.message });
  }
};
