import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const userDB = mongoose.createConnection(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

userDB.on("connected", () => console.log("✅ User Database Connected Successfully"));
userDB.on("error", (err) => {
    console.error("❌ User Database Connection Error:", err.message);
    process.exit(1);
});

export default userDB;