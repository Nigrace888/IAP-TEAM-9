import express from 'express';
import { deleteUser, Login, Signup, updateUser } from '../controllers/authController.js';


const router = express.Router();

router.post('/login',Login)
router.post('/signup',Signup)
router.delete("/users/:id",deleteUser)
router.put("/users/id",updateUser)
export default router;