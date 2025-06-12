import { Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './ManageExam.css';

const ManageExam = () => {
  const [exams, setExams] = useState({});

  useEffect(() => {
    // Fetch all questions from your backend API
    fetch('http://localhost:3000/api/questions/all')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched questions:', data); // <-- Add this line
        // Group questions by exam_title
        const grouped = {};
        data.questions.forEach(q => {
          if (!grouped[q.exam_title]) grouped[q.exam_title] = [];
          grouped[q.exam_title].push(q);
        });
        setExams(grouped);
      });
  }, []);

  console.log('Grouped exams:', exams);

  return (
    <div>
      <Card className='page-header'>
        <Typography className='page-header-text'>
          Manage Exam Page
        </Typography>
      </Card>

      <div className="exam-cards-container">
        {Object.entries(exams).length > 0 ? (
          Object.entries(exams).map(([examTitle, questions]) => (
            <Card key={examTitle} className="exam-card">
              <Typography variant="h6">{examTitle}</Typography>
              <Typography variant="body2">
                {questions.length} Questions
              </Typography>
              <ul>
                {questions.map((q, index) => (
                  <li key={index}>
                    <Typography variant="body2">{q.question}</Typography>
                  </li>
                ))}
              </ul>
              <div className="exam-actions">
                <button className="action-button">Edit</button>
                <button className="action-button">Delete</button>
              </div>
            </Card>
          ))
        ) : (
          <Typography variant="body1" className="no-exams-text">
            No exams available.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ManageExam;