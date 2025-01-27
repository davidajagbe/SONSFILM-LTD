import jwt from 'jsonwebtoken';
import AsyncHandler from 'express-async-handler';
import User from '../Model/UserModel.js';

const protect = AsyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies.jwt) {
    token = req.cookies.jwt;//retrieve token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      //cheeck if user still exist
      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }
      // if(req.user.status !== true){
      //   res.status(403);
      //   throw new Error("User accountnot activated.")
      // }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
