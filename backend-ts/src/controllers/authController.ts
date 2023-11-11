import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

// REGISTER USER
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
     const { firstName, lastName, email, password, picPath, location, occupation } = req.body;

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

     const newUser = new User({
         firstName,
         lastName,
         email,
         password: hashedPassword,
         picPath,
         location,
         occupation,
         viewedProfile: Math.floor(Math.random() * 10000),
         impressions: Math.floor(Math.random() * 10000),
     });

      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
   } catch (err : any) {
        res.status(500).json(err);
    }
}

// LOGIN USER
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }) as any;
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY!);
        delete user.password;
        res.status(200).json({ user, token });
    } catch (err : any) {
        res.status(500).json(err);
    }
}