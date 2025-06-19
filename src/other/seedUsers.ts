import mongoose, { Schema, Document } from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

// Define the User Interface
interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: "user";
}

// Define the User Schema
const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user"] },
});

// Create the User Model
const User = mongoose.model<IUser>("User", UserSchema);

// MongoDB Connection URI
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/usersdb";

const createFakeUsers = async () => {
    try {
        await mongoose.connect(MONGO_URI); // Updated without deprecated options

        let users: IUser[] = [];
        for (let i = 0; i < 50; i++) {
            users.push(
                new User({
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    email: faker.internet.email(),
                    role: faker.helpers.arrayElement(["user"]),
                })
            );
        }

        await User.insertMany(users);
        console.log("✅ 50 Fake Users Created Successfully!");
    } catch (error) {
        console.error("❌ Error creating users:", error);
    } finally {
        await mongoose.disconnect(); // Ensure the connection is properly closed
    }
};

// Run the script
createFakeUsers();
