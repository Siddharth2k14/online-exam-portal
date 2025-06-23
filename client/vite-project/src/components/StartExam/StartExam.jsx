import { Card, Typography, CardContent, List, ListItem, ListItemText, Divider, CircularProgress, Radio, RadioGroup, FormControlLabel, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './StartExam.css';

const StartExam = () => {
    const { examTitle } = useParams();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setError("");
            try {
                let res = await fetch(`http://localhost:3000/api/questions/objective/${encodeURIComponent(examTitle)}`);
                if (res.ok) {
                    const data = await res.json();
                    setExam({
                        exam_title: examTitle,
                        type: "Objective",
                        questions: data.questions.map(q => ({
                            question_text: q.question_title,
                            options: q.options,
                            correct_option: q.correct_option
                        }))
                    });
                    setAnswers(Array(data.questions.length).fill(""));
                } else {
                    res = await fetch(`http://localhost:3000/api/questions/subjective/${encodeURIComponent(examTitle)}`);
                    if (res.ok) {
                        const data = await res.json();
                        setExam({
                            exam_title: examTitle,
                            type: "Subjective",
                            questions: data.questions.map(q => ({
                                question_text: q.question,
                                answer: q.answer
                            }))
                        });
                        setAnswers(Array(data.questions.length).fill(""));
                    } else {
                        setError(`No exam data found for "${examTitle}". Please start the exam from the exams list.`);
                    }
                }
            } catch (err) {
                setError("Failed to fetch questions. Please try again later.");
                console.error(err.message);
            }
            setLoading(false);
        };
        fetchQuestions();
    }, [examTitle]);

    const handleOptionChange = (e) => {
        const updated = [...answers];
        updated[current] = Number(e.target.value);
        setAnswers(updated);
    };

    const handleTextChange = (e) => {
        const updated = [...answers];
        updated[current] = e.target.value;
        setAnswers(updated);
    };

    const handlePrev = () => {
        setCurrent((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrent((prev) => Math.min(prev + 1, exam.questions.length - 1));
    };

    const handleSubmit = () => {
        setSubmitted(true);
        let correct = 0;

        if (exam.type === "Objective") {
            exam.questions.forEach((q, idx) => {
                if (typeof q.correct_option === "number" && answers[idx] === q.correct_option) {
                    correct++;
                } else if (typeof q.correct_option === "string" && q.options[answers[idx]] === q.correct_option) {
                    correct++;
                }
            });
        } else if (exam.type === "Subjective") {
            exam.questions.forEach((q, idx) => {
                const userAnswer = answers[idx]?.trim().toLowerCase();
                const correctAnswer = q.answer?.trim().toLowerCase();
                if (userAnswer === correctAnswer) {
                    correct++;
                }
            });
        }

        setScore(correct);
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Card sx={{ maxWidth: 600, margin: "2rem auto", p: 2 }}>
                <CardContent>
                    <Typography color="error" variant="h6">
                        {error}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    if (!exam) return null;

    const question = exam.questions[current];

    return (
        <Card className="start-exam-root" sx={{ maxWidth: 600, margin: "2rem auto", p: 3 }}>
            <CardContent>
                <Typography variant="h5" className="start-exam-title" gutterBottom>
                    {exam.exam_title}
                </Typography>
                <Typography variant="subtitle1" className="start-exam-type" gutterBottom>
                    Type: {exam.type}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h6" className="start-exam-question" gutterBottom>
                    Q{current + 1}: {question.question_text}
                </Typography>
                {exam.type === "Subjective" ? (
                    <>
                        <TextField
                            multiline
                            minRows={3}
                            fullWidth
                            placeholder="Write your answer here..."
                            value={answers[current]}
                            onChange={handleTextChange}
                            disabled={submitted}
                            className="start-exam-textarea"
                        />
                        {submitted && (
                            <Typography sx={{ mt: 2 }}>
                                {answers[current] &&
                                    answers[current].trim().toLowerCase() === question.answer.trim().toLowerCase() ? (
                                    <span style={{ color: "green" }}>Correct!</span>
                                ) : (
                                    <span style={{ color: "red" }}>
                                        Incorrect. Correct answer: <b>{question.answer}</b>
                                    </span>
                                )}
                            </Typography>
                        )}
                    </>
                ) : (
                    <RadioGroup
                        value={answers[current]}
                        onChange={handleOptionChange}
                        className="start-exam-options"
                    >
                        {question.options.map((opt, i) => (
                            <FormControlLabel
                                key={i}
                                value={i}
                                control={<Radio />}
                                label={`${String.fromCharCode(65 + i)}. ${opt}`}
                                disabled={submitted}
                            />
                        ))}
                    </RadioGroup>
                )}
                {submitted && exam.type === "Objective" && (
                    <Typography sx={{ mt: 2 }}>
                        {(typeof question.correct_option === "number"
                            ? answers[current] === question.correct_option
                            : question.options[answers[current]] === question.correct_option)
                            ? <span style={{ color: "green" }}>Correct!</span>
                            : <span style={{ color: "red" }}>
                                Incorrect. Correct answer: <b>
                                    {typeof question.correct_option === "number"
                                        ? question.options[question.correct_option]
                                        : question.correct_option}
                                </b>
                            </span>
                        }
                    </Typography>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                    <Button
                        variant="contained"
                        onClick={handlePrev}
                        disabled={current === 0 || submitted}
                    >
                        Prev
                    </Button>
                    {current < exam.questions.length - 1 ? (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={submitted || answers[current] === undefined || answers[current] === ""}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSubmit}
                            disabled={submitted || answers[current] === undefined || answers[current] === ""}
                        >
                            Submit
                        </Button>
                    )}
                </div>
                {submitted && exam.type === "Objective" && (
                    <Typography sx={{ mt: 3 }} variant="h6">
                        Your Score: {score} / {exam.questions.length}
                    </Typography>
                )}
                {submitted && exam.type === "Subjective" && (
                    <Typography sx={{ mt: 3 }} variant="h6" color="primary">
                        Your Score: {score} / {exam.questions.length}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default StartExam;