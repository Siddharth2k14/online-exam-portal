import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },

    exam_name: {
        type: String,
        required: true,
        unique: false,
    },

    question_title: {
        type: String,
        required: true,
        unique: false,
    },

    options: {
        type: [String],
        required: true,
        unique: false,
    },

    correct_option: {
        type: Number,
        required: true,
        unique: false,
    },
});

const QuestionModel = mongoose.model("Question", QuestionSchema);
export default QuestionModel;