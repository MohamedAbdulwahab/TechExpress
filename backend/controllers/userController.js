import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utilities/generateToken.js';

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
    // use generateToken from utilities to generate a jwt and set it as a http-only cookie.
    generateToken(res, user._id);

    res.status(200).json({
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
const registerUser = asyncHandler(async (req, res) => {
  // get name, email, and password from the request body.
  const { name, email, password } = req.body;

  // search for user by email in the database.
  const userExists = await User.findOne({ email });

  // user already exists in the database.
  if (userExists) {
    // send a client errer.
    res.status(400);

    // throw and error.
    throw new Error('Email is used by an existing user');
  }

  // create a new user.
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  // new user has been created.
  if (user) {
    // create a json web token (jwt) and set it as a http-only cookie.
    generateToken(res, user._id);

    // set status to success creation (201) and send user info.
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // user has not been created.
    res.status(400);

    // throw an error.
    throw new Error('Invalid user data');
  }
});

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
const getUserProfile = asyncHandler(async (req, res) => {
  // find the signed in user.
  const user = await User.findById(req.user._id);

  if (user) {
    // set the status to success (200) and send user info.
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // send a not found status (404).
    res.status(404);

    // throw an error.
    throw new Error('User not found');
  }
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // find the signed in user by id.
  const user = await User.findById(req.user._id);

  if (user) {
    // search for user by email in the database.
    const userExists = await User.findOne({ email: req.body.email });

    // email already exists in the database.
    if (userExists) {
      // send a client errer.
      res.status(400);

      // throw and error.
      throw new Error('Email is used by an existing user');
    } else {
      // email doesn't exist in the database: update email.
      user.email = req.body.email || user.email;
    }

    // update name.
    user.name = req.body.name || user.name;

    // trigger only if user requests password update.
    if (req.body.password) {
      user.password = req.body.password;
    }

    // wait for the data to get updated.
    const updatedUser = await user.save();

    // response with success status (200) and the updated user info.
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    // send a not found status (404).
    res.status(404);

    // throw an error.
    throw new Error('User not found');
  }
});

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
