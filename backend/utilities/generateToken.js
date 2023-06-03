import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // create a json web token (jwt).
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // set JWT as a http-only cookie.
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // expires in 30 days.
  });
};

export default generateToken;
