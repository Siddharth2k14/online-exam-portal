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

const ExamCreation = () => {
  const [titleExam, setTitleExam] = useState('');
  const [open, setOpen] = useState(false);
  const [examType, setExamType] = useState('objective');
  const [examCreated, setExamCreated] = useState(false);
  const navigate = useNavigate();

  const handleCreateExam = () => {
    setOpen(true);
    setExamCreated(true);
    if (examType === 'objective') {
      navigate('/exam-creation/objective', { state: { titleExam } });
    }
    // You can add similar logic for subjective if needed
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };


  return (
    <>
      <Typography
        variant='h6'
        gutterBottom
        sx={{
          textAlign: 'center'
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
      </Card>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Exam for {titleExam} subject of {examType} type questions is Created
        </Alert>
      </Snackbar>
    </>
  );
};

export default ExamCreation;