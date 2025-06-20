import express from 'express';
import QuestionModel from '../Models/OuestionModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { examTitle, question, options, correct } = req.body;
    if (!examTitle || !question || !options || correct === undefined || correct === null) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save question
    const newQuestion = new QuestionModel({
        id: Date.now(), // or use auto-increment logic if needed
        exam_name: examTitle,
        question_title: question,
        options: options,
        correct_option: correct
    });

    await newQuestion.save();
    res.status(201).json({ question: newQuestion });
});

router.get('/all', async (req, res) => {
    const questions = await QuestionModel.find();
    const groupedQuestions = questions.reduce((acc, question) => {
        if (!acc[question.exam_name]) acc[question.exam_name] = [];
        acc[question.exam_name].push(question);
        return acc;
    }, {});
    res.json({ questions: groupedQuestions });
});

router.get('/:examTitle', async (req, res) => {
    const { examTitle } = req.params;
    const filteredQuestions = await QuestionModel.find({ exam_name: examTitle });
    if (filteredQuestions.length === 0) {
        return res.status(404).json({ message: 'No questions found for this exam' });
    }
    res.json({ questions: filteredQuestions });
});

router.delete('/:exam_title', async (req, res) => {
  try {
    const examTitle = req.params.exam_title;
    await QuestionModel.deleteMany({ exam_name: examTitle });
    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete exam' });
  }
});

export default router;