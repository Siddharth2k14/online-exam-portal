import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from '@mui/material';
import './ViewExam.css'; // Assuming you have a CSS file for styling

const ViewExam = () => {
  const { examTitle } = useParams();
  const navigate = useNavigate();
  const exam = useSelector(state =>
    state.exams.exams.find(e => e.title === examTitle)
  );

  if (!exam) {
    return <Typography variant="h6">Exam not found.</Typography>;
  }

  return (
    <div className="view-exam-container">
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        className="view-exam-back-btn"
      >
        Back
      </Button>
      <Card className="view-exam-card">
        <Typography variant="h4" className="view-exam-title" gutterBottom>
          {exam.title}
        </Typography>
        {exam.questions.length === 0 ? (
          <Typography>No questions in this exam.</Typography>
        ) : (
          exam.questions.map((q, idx) => (
            <div key={idx} className="view-exam-question-block">
              <Typography className="view-exam-question" variant="subtitle1">
                {idx + 1}. {q.question}
              </Typography>
              {q.options && q.options.map((opt, oidx) => (
                <Typography
                  key={oidx}
                  className={`view-exam-option${q.correct === oidx ? ' correct-option' : ''}`}
                  style={q.correct === oidx ? { fontWeight: 'bold', color: '#388e3c' } : {}}
                >
                  {String.fromCharCode(65 + oidx)}. {opt}
                  {q.correct === oidx && (
                    <span style={{ marginLeft: 8, color: '#388e3c' }}>(Correct)</span>
                  )}
                </Typography>
              ))}
            </div>
          ))
        )}
      </Card>
    </div>
  );
};

export default ViewExam;