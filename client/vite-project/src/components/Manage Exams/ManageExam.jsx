import { Card, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExam } from '../../redux/examSlice';
import './ManageExam.css';
import { useNavigate } from 'react-router-dom';

const ManageExam = () => {
  const exams = useSelector(state => state.exams.exams);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleView = (title) => {
    navigate(`/manage-exam/view/${encodeURIComponent(title)}`);
  };

  const handleDelete = (title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      dispatch(deleteExam(title));
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