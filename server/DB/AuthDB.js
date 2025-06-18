import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const connectAuthDB = async () => {
    try {
        await mongoose.createConnection(process.env.MONGO_URI, {
            ssl: false
        });

        console.log("AuthDB connected successfully");
    } catch (error) {
        console.error("Error connecting to AuthDB:", error);
        process.exit(1);
    }
};

export default connectAuthDB;