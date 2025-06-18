import express from 'express';
const router = express.Router();
let questions = [];

router.post('/', (req, res) => {
    const { examTitle, question, options, correct_option } = req.body;
    if(!examTitle || !question || !options || correct_option === undefined || correct_option === null){
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newQuestion = {
        id: questions.length + 1,
        exam_name: examTitle,
        question_title: question,
        options: options,
        correct_option: correct_option
    };

    questions.push(newQuestion);
    res.status(201).json({ question: newQuestion });
});

router.get('/:examTitle', (req, res) => {
    const { examTitle } = req.params;
    const filteredQuestions = questions.filter(q => q.exam_name === examTitle);
    
    if(filteredQuestions.length === 0){
        return res.status(404).json({ message: 'No questions found for this exam' });
    }

    res.json({ questions: filteredQuestions });
});

router.get('/all', (req, res) => {
    if(questions.length === 0){
        return res.status(404).json({ message: 'No questions found' });
    }

    const groupedQuestions = questions.reduce((acc, question) => {
        if(!acc[question.exam_name]){
            acc[question.exam_name] = [];
        }
        acc[question.exam_name].push(question);
        return acc;
    }, {});

    res.json({ questions: groupedQuestions });
});

export default router;