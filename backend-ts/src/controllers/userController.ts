import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

// GET ALL USERS
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find() as any;
        
        res.status(200).json(users);
    } catch (err : any) {
        res.status(500).json(err);
    }
}

// GET USER
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id) as any;
        
        res.status(200).json(user);
    } catch (err : any) {
        res.status(500).json(err);
    }
}

// GET USER FRIENDS
export const getUserFriends = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id) as any;
        const friends = await Promise.all(
            user.friends.map((friendId: any) => {
                return User.findById(friendId);
            })
        );
        const formattedFriends = friends.map(({ _id, firstName, lastName, picPath, occupation, location }) => {
            return { _id, firstName, lastName, picPath, occupation, location };
        });

        res.status(200).json(formattedFriends);
    } catch (err : any) {
        res.status(500).json(err);
    }
}

// ADD/REMOVE FRIEND
export const addRemoveFriend = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id) as any;
        const friend = await User.findById(req.params.friendId) as any;

        if (user.friends.includes(req.params.friendId)) {
            user.friends = user.friends.filter((friendId: any) => friendId !== req.params.friendId);
            friend.friends = friend.friends.filter((friendId: any) => friendId !== req.params.id);
        }

        else {
            user.friends.push(req.params.friendId);
            friend.friends.push(req.params.id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((friendId: any) => {
                return User.findById(friendId);
            })
        );
        const formattedFriends = friends.map(({ _id, firstName, lastName, picPath, occupation, location }) => {
            return { _id, firstName, lastName, picPath, occupation, location };
        });

        res.status(200).json(formattedFriends);
    } catch (err : any) {
        res.status(500).json(err);
    }
}
