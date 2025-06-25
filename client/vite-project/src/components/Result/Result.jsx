import { Card, Typography } from '@mui/material';
import './Result.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Result = () => {
    // Get all exam results from localStorage
    const LOCAL_STORAGE_KEY = "studentExamHistory";
    let score = 0, totalQuestions = 0, percentage = 0;
    let correctAnswers = 0, wrongAnswers = 0;
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (data) {
            try {
                const history = JSON.parse(data);
                if (history.length > 0) {
                    // Sum over all exams
                    score = history.reduce((sum, exam) => sum + (exam.score || 0), 0);
                    totalQuestions = history.reduce((sum, exam) => sum + (exam.totalQuestions || 0), 0);
                    correctAnswers = score;
                    wrongAnswers = totalQuestions - score;
                    percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
                }
            } catch { /* ignore JSON parse errors, treat as no results */ }
        }
    }
    return (
        <div className="result-root">
            <Typography variant="h4" gutterBottom className="result-title">
                Result
            </Typography>
            <div className="result-grid">
                <div className="result-left">
                    <Card className="result-large-card">
                        <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={buildStyles({
                                pathColor: "white",
                                textColor: "black",
                                trailColor: "#1565c0",
                                backgroundColor: "#1976d2",
                                textSize: '24px',
                            })}
                        />
                    </Card>
                    <div className="result-score">
                        <Typography variant="h6" gutterBottom className="result-card-title" style={{ marginTop: 16, color: 'black' }}>
                            Your Score: {score}
                        </Typography>
                    </div>
                </div>

                <div className="result-right">
                    <Card className="result-card">
                        <Typography variant="h6" gutterBottom className="result-card-title">
                            Total Questions: {totalQuestions}
                        </Typography>
                    </Card>
                    <Card className="result-card">
                        <Typography variant="h6" gutterBottom className="result-card-title">
                            Correct Answers: {correctAnswers}
                        </Typography>
                    </Card>
                    <Card className="result-card">
                        <Typography variant="h6" gutterBottom className="result-card-title">
                            Wrong Answers: {wrongAnswers}
                        </Typography>
                    </Card>
                    <Card className="result-card">
                        <Typography variant="h6" gutterBottom className="result-card-title">
                            Percentage: {percentage}%
                        </Typography>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Result;
