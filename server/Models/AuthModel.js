import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
});

const AuthModel = mongoose.model("Auth", AuthSchema);

export default AuthModel;