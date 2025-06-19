import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, Typography, Button } from '@mui/material';
import axios from 'axios';
import './ViewExam.css';

const ViewExam = () => {
  const { examTitle } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/questions/${encodeURIComponent(examTitle)}`);
        setQuestions(res.data.questions || []);
      } catch (error) {
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [examTitle]);

  if (loading) return <Typography>Loading...</Typography>;

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
          {examTitle}
        </Typography>
        {questions.length === 0 ? (
          <Typography>No questions in this exam.</Typography>
        ) : (
          questions.map((q, idx) => (
            <div key={idx} className="view-exam-question-block">
              <Typography className="view-exam-question" variant="subtitle1">
                {idx + 1}. {q.question_title}
              </Typography>
              {q.options && q.options.map((opt, oidx) => (
                <Typography
                  key={oidx}
                  className={`view-exam-option${q.correct_option === oidx ? ' correct-option' : ''}`}
                  style={q.correct_option === oidx ? { fontWeight: 'bold', color: '#388e3c' } : {}}
                >
                  {String.fromCharCode(65 + oidx)}. {opt}
                  {q.correct_option === oidx && (
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