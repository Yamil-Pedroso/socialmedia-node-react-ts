import { Schema, model, Types } from "mongoose";

interface IPost {
    id: string | null;
    userId: string;
    firstName: string;
    lastName: string;
    location: string;
    description: string;
    comments: string[];
    picPath: string;
    userPicturePath: string;
    likes: Map<string, boolean>;
    timestamp: Date;
}

const postSchema = new Schema<IPost>({
    id: { type: Types.ObjectId },
    userId: { type: String, required: true },
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    location: { type: String },
    description: { type: String, max: 500 },
    picPath: { type: String },
    userPicturePath: { type: String },
    likes: { type: Map, of: Boolean },
    comments: { type: [String], default: [] },
    timestamp: { type: Date, default: Date.now },
});

const Post = model<IPost>("Post", postSchema);

export default Post;