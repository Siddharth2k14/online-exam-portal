import React, { useState } from 'react'
import './AdminPage.css';
import { Card, CardContent, Typography } from '@mui/material';
import AdminSideBar from '../Admin SideBar/AdminSideBar';
import ExamCreation from '../Exam Creation/ExamCreation';
import ManageExam from '../Manage Exams/ManageExam';

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const [titleExam, setTitleExam] = useState('');
  // const [submittedTitle, setSubmittedTitle] = useState('');

  const renderContent = () => {
    if (selectedSection === 'Exam Creation') {
      return <ExamCreation />;
    }
    else if (selectedSection === 'Manage Exams') {
      return <ManageExam />;
    }
    else if (selectedSection === 'Schedule Exams') {
      return (
        <>
          <Typography variant='h6' gutterBottom>
            Schedule Exams
          </Typography>
          <Typography variant='body1'>
            Here we can schedule the exams.
          </Typography>
        </>
      );
    }

    return (
      <>
        <div className='admin-welcome'>
          <Typography variant="h6" gutterBottom>
            Welcome, Admin!
          </Typography>
          <Typography variant="body1">
            Use the sidebar to manage exams and settings.
          </Typography>
        </div>
      </>
    );
  };

  return (
    <>
      <AdminSideBar onSectionSelect={setSelectedSection} />
      <div className='admin-page'>
        <Typography variant='h4' className='admin-heading'>
          Admin Dashboard
        </Typography>
        <hr className='horizontal-line' />
        <Card data-testid="admin-card">
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default AdminPage;
