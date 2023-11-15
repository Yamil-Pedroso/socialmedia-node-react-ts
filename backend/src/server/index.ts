import express from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import connectDB from '../config/db';
import auth from '../routes/auth';
import userRoutes from '../routes/users';
import postRoutes from '../routes/posts';
import { createPost } from '../controllers/postController';
import { registerUser } from '../controllers/authController';
import { verifyToken } from '../middlewares/auth';
import cloudinary from 'cloudinary';
import User from '../models/user';
import Post from '../models/post';
import { users, posts } from '../data';

dotenv.config({ path: '../src/config/config.env' });

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "../../public/assets")));
//app.use("/assets", express.static(path.join(__dirname, "public/assets")), (req: Request, res: Response) => {
//    const imagePaths = "public/assets/jane.jpg";
//
//    fs.readFile(imagePaths, (err, data) => {
//        if (err) {
//            console.error(err);
//            res.status(500).json({ error: "Internal Server Error" });
//        }
//
//        res.writeHead(200, { "Content-Type": "image/jpeg" });
//        res.end(data);
//    });
//});

// Cloudinary Configuration


//app.use('/assets', express.static(staticPath));
//
//app.get('/api/v1/users/:id/image', async (req, res) => {
//    const userId = req.params.id;
//
//    try {
//        // Fetch the user by userId
//        const user = await User.findById(userId);
//
//        if (!user) {
//            // Handle case where user is not found
//            return res.status(404).json({ error: 'User not found' });
//        }
//
//        // Get the user's image path
//        const userImage = user.picPath;
//
//        // Send the image file
//        res.sendFile(path.join(staticPath, userImage));
//    } catch (error) {
//        // Handle database or other errors
//        console.error(error);
//        res.status(500).json({ error: 'Internal Server Error' });
//    }
//});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// import routes with files
app.post('/api/v1/auth/register', upload.single("picture"), registerUser);
app.post('/api/v1/posts', verifyToken, upload.single("picture"), createPost);

// import all routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);



app.get('/', (req: Request, res: Response) => {
        res.json({ message: 'Hello World!' });
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);

    // Seed database one time
    //User.insertMany(users);
    //Post.insertMany(posts);
});
