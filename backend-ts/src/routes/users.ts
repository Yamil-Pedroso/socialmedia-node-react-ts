import express from 'express';
const router = express.Router();

import {
    getUser,
    getUsers,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/userController';
import { verifyToken } from '../middlewares/auth';

router.route('/').get(getUsers);
router.route('/:id').get(verifyToken, getUser);
router.route('/:id/friends').get(verifyToken, getUserFriends);

router.route('/:id/:friendId').patch(verifyToken, addRemoveFriend);

export default router;