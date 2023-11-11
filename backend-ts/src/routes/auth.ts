import express from 'express';
const router = express.Router();
import { loginUser } from '../controllers/authController';

router.route('/login').post(loginUser);


export default router;