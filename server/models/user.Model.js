import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Please provide unique username"],
        unique: [true, "username exists"]
    },
    email: {
        type: String,
        required: [true, "Please provide unique Email."],
        unique: [true]
    },
    password: {
        type: String,
        required: [true, "Please provide Password."],
        unique: false
    },
    address: {
        type: String,
    },
    profile: {
        type: String,
    },
});

export default mongoose.model.Users || mongoose.model("User", userSchema);