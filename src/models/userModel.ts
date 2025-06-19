import mongoose from "mongoose";

type UserStatus = "active" | "inactive";
type UserRole = "user" | "admin";

interface IUser extends mongoose.Document {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: UserStatus;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
