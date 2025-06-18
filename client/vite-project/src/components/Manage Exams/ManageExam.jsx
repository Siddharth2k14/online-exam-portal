import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography } from '@mui/material';
import './ManageExam.css';

const ManageExam = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/questions/all');
        if (res.data && res.data.questions) {
          const formattedExams = Object.entries(res.data.questions).map(([title, questions]) => ({
            title,
            questions,
          }));
          setExams(formattedExams);
        }
      } catch (error) {
        console.error('Error fetching exams:', error.message);
        setExams([]);
      }
    };
    fetchExams();
  }, []);

  const handleView = (title) => {
    alert(`View exam: ${title}`);
  };

  const handleDelete = async (title) => {
    try {
      await axios.delete(`http://localhost:3000/api/questions/${title}`);
      setExams((prev) => prev.filter((exam) => exam.title !== title));
    } catch (error) {
      console.error('Error deleting exam:', error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4" className="manage-exam-title" style={{ margin: '32px 0 16px 0', textAlign: 'center' }}>
        Manage Exams
      </Typography>
      <div className="exam-cards-container">
        {exams.length > 0 ? (
          exams.map((exam) => (
            <Card key={exam.title} className="exam-card">
              <Typography variant="h6">{exam.title}</Typography>
              <Typography variant="body2" style={{ margin: '8px 0' }}>
                {exam.questions.length} Questions
              </Typography>
              <div className="exam-actions">
                <button className="action-button" onClick={() => handleView(exam.title)}>View</button>
                <button className="action-button" onClick={() => handleDelete(exam.title)}>Delete</button>
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