import express from 'express'
import { authUser,registerUser,logout,getUserProfile,updateUserProfile } from '../controllers/UserController.js';
import {protect}  from '../middleware/authMiddleware.js';

const router = express.Router()
router.route('/signup').post(registerUser)
router.route('/login').post(authUser)
router.route('/logout').post(logout)

//Profile(requires AUthentication using protect authmiddleware)
router.route('/profile')
.get(protect,getUserProfile)
.put(protect,updateUserProfile);

export default router
