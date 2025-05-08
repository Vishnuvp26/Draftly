import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string
    email: string
    password: string
    mobile?: number
    image?: string
}   

const UserSchema: Schema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        mobile: {
            type: Number
        },
        image: {
            type: String
        }
    }
);

export const User = mongoose.model<IUser>('User', UserSchema);
export default User;