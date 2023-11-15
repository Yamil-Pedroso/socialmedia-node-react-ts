import express from 'express';
const router = express.Router();

import { getFeedPosts, getUserPosts, likePost } from '../controllers/postController';
import { verifyToken } from '../middlewares/auth';

//router.route('/').get(verifyToken, getFeedPosts);
router.route('/').get(getFeedPosts);
router.route('/:userId/posts').get(verifyToken, getUserPosts);

router.route('/:id/like').patch(verifyToken, likePost);

export default router;
