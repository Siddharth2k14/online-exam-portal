import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CardActions, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './ExamsPage.css';
import StartExam from '../StartExam/StartExam.jsx';
import { useNavigate } from "react-router-dom";

const ExamsPage = () => {
  const [exams, setExams] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/questions/all');
        const examData = response.data.exams || [];
        setExams(examData);

        // Extract unique subjects
        const uniqueSubjects = [...new Set(examData.map(exam => exam.exam_title))];
        setSubjects(uniqueSubjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exams:', error);
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  const filteredExams = exams.filter(exam => {
    const matchesSubject = !selectedSubject || exam.exam_title === selectedSubject;
    const matchesType = !selectedType || exam.type === selectedType;
    return matchesSubject && matchesType;
  });

  const handleStartExam = (exam) => {
    navigate(`/start-exam/${encodeURIComponent(exam.exam_title)}`, { state: { exam } });
  }

  return (
    <div className="exams-page">
      <Typography variant="h4" className="page-title" gutterBottom>
        Available Exams
      </Typography>

      <div className="filters">
        <FormControl sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel>Select Subject</InputLabel>
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            label="Select Subject"
          >
            <MenuItem value="">All Subjects</MenuItem>
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>{subject}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Exam Type</InputLabel>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            label="Exam Type"
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="Objective">Objective</MenuItem>
            <MenuItem value="Subjective">Subjective</MenuItem>
          </Select>
        </FormControl>
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <div className="exams-grid">
          {filteredExams.map((exam) => (
            <Card key={exam.exam_title} className="exam-card">
              <CardContent>
                <Typography variant="h6">{exam.exam_title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {exam.type}
                </Typography>
                <Typography variant="body2">
                  Questions: {exam.questions.length}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStartExam(exam)}
                >
                  Start Exam
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
