import mongoose from "mongoose"
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const connectQuesDB = async () => {
    try {
        await mongoose.createConnection(process.env.MONGO_URI, {
            ssl: false
        });

        console.log("QuestionDB connected successfully");
    } catch (error) {
        console.error("Error connecting to QuestionDB:", error);
        process.exit(1);
    }
};

export default connectQuesDB;