import jwt from 'jsonwebtoken';
import AsyncHandler from 'express-async-handler';
import User from '../Model/UserModel.js';

export const protect = AsyncHandler(async (req, res, next) => {
  console.log("Protect middleware hit!");
  console.log("Request cookies:", req.cookies);
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;//retrieve token
    console.log("Token found in cookies:", token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    console.log("No token found in cookies.");
    res.status(401);
    throw new Error('Not authorized, no token found');
  }
});