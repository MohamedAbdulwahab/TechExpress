import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @desc    authenticate user (login) & get token
// @route   POST /api/user/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  // get email and password from the request body.
  const { email, password } = req.body;

  // find the user by email.
  const user = await User.findOne({ email });

  // user is found.
  if (user && (await user.comparePassword(password))) {
    // create a json web token (jwt)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // set JWT as a http-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // expires in 30 days.
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    register (creat) a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    res.send('register user');
  } catch (error) {
    res.status(404).json({ message: 'register user error' });
  }
};

// @desc    logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  // clear the cookie.
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  // set status to 200 (success) and send a success message.
  res.status(200).json({ message: 'logged out successfully' });
});

// @desc    get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    res.send('get user profile');
  } catch (error) {
    res.status(404).json({ message: 'get user profile error' });
  }
};

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    res.send('update user profile');
  } catch (error) {
    res.status(404).json({ message: 'update user profile error' });
  }
};

// @desc    get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    res.send('get all user profiles');
  } catch (error) {
    res.status(404).json({ message: 'get all user profiles error' });
  }
};

// @desc    get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserByID = async (req, res) => {
  try {
    res.send('get user by id');
  } catch (error) {
    res.status(404).json({ message: 'get user by id' });
  }
};

// @desc    delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    res.send('delete user');
  } catch (error) {
    res.status(404).json({ message: 'delete user error' });
  }
};

// @desc    update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    res.send('update user');
  } catch (error) {
    res.status(404).json({ message: 'update user error' });
  }
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
