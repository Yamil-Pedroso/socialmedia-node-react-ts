import { Request, Response, NextFunction } from 'express';
import Post from '../models/post';
import User from '../models/user';

// CREATE POST
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, description, picPath } = req.body;
        const user = await User.findById(userId) as any;

        const newPost = new Post({
            userId,
            fistName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picPath,
            picPath,
            likes: {},
            comments: [],
        });

        await newPost.save();
        const post = await Post.find();

        res.status(201).json(post);
    } catch (err : any) {
        res.status(409).json(err);
    }
}

// GET POST
export const getFeedPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await Post.find();

        res.status(200).json(post);
    } catch (err : any) {
        res.status(500).json(err);
    }
}

// GET USER POSTS
export const getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await Post.find({ userId: req.params.userId });

        res.status(200).json(post);
    } catch (err : any) {
        res.status(500).json(err);
    }
}

// UPDATE POST
export const likePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await Post.findById(req.params.id) as any;
        const isLiked = post.likes.get(req.body.userId);

        if (isLiked) {
            post.likes.delete(req.body.userId);
        } else {
            post.likes.set(req.body.userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {likes: post.likes}, { new: true });
        res.status(200).json(updatedPost);
    } catch (err : any) {
        res.status(500).json(err);
    }
}