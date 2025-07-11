import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Typography,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import './ExamCreation.css';
import ObjectiveExamCreation from '../Objective Exam Creation/ObjectiveExamCreation';
import { useDispatch } from 'react-redux';
import { addExam } from '../../redux/examSlice';
import axios from 'axios';

const ExamCreation = () => {
  const [titleExam, setTitleExam] = useState('');
  const [open, setOpen] = useState(false);
  const [examType, setExamType] = useState('objective');
  const [examCreated, setExamCreated] = useState(false);
  const [error, setError] = useState(''); // Add error state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateExam = async () => {
    // Validation: check if titleExam and examType are filled
    if (!titleExam.trim() || !examType) {
      setError('Please fill all fields.');
      setOpen(true);
      return;
    }
    setError('');
    setOpen(true);
    setExamCreated(true);
    dispatch(addExam({ title: titleExam, type: examType }));

    if (examType === 'objective') {
      navigate('/exam-creation/objective', { state: { titleExam } });
    } else if (examType === 'subjective') {
      navigate('/exam-creation/subjective', { state: { titleExam } });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  // handleDelete is already correct:
  const handleDelete = async (title) => {
    try {
      await axios.delete(`https://online-exam-portal-server.onrender.com/api/questions/objective/${title}`);
      await axios.delete(`https://online-exam-portal-server.onrender.com/api/questions/subjective/${title}`);
      setExams((prev) => prev.filter((exam) => exam.title !== title));
    } catch (error) {
      console.error('Error deleting exam:', error.message);
    }
  };

  return (
    <>
      <Typography
        variant='h4'
        gutterBottom
        sx={{
          margin: '32px 0 16px 0',
          textAlign: 'center',
          color: 'white'
        }}
      >
        Exam Creation
      </Typography>

      <Card className='exam-creation-card'>
        <Input
          type='text'
          placeholder='Enter the title of the exam'
          value={titleExam}
          onChange={(e) => setTitleExam(e.target.value)}
          className='title-input'
        />

        <FormControl className='form-type'>
          <FormLabel className='form-type-label'>Type of Exam</FormLabel>
          <RadioGroup
            defaultValue="objective"
            onChange={(e) => setExamType(e.target.value)}
          >
            <FormControlLabel
              value="objective"
              control={<Radio />}
              label="Objective"
              className='form-type-radio'
            />
            <FormControlLabel
              value="subjective"
              control={<Radio />}
              label="Subjective"
              className='form-type-radio'
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleCreateExam}
        >
          Create Exam
        </Button>
        {/* Show error or success Snackbar */}
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
            {error
              ? error
              : `Exam for ${titleExam} subject of ${examType} type questions is Created`}
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
};

export default ExamCreation;