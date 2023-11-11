import { Schema, model, Types } from "mongoose";

interface IUser {
    id: string | null;
    firstName: string;
    lastName: string;
    friends: string[];
    email: string;
    password: string;
    picPath?: string;
    location: string;
    occupation: string;
    viewedProfile: number;
    impressions: number;
    timestamp: Date;
}

const userSchema = new Schema<IUser>({
    id: { type: Types.ObjectId },
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 8, max: 50 },
    picPath: { type: String, default: "" },
    friends: { type: [String]},
    location: { type: String },
    occupation: { type: String},
    viewedProfile: { type: Number },
    impressions: { type: Number },
    timestamp: { type: Date, default: Date.now },
});

const User = model<IUser>("User", userSchema);

export default User;
