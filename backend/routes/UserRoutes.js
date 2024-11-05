import express from 'express'
import { authUser,registerUser,logoutUser,getUserProfile,updateUserProfile } from '../controllers/UserController.js';
import {protect}  from '../middleware/authMiddleware.js';

const router = express.Router()
router.route('/').post(registerUser)
router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);

export default router

// Homepage
// Register user
// As an 