import { Card, CardContent, Typography } from '@mui/material'
import './StudentPage.css'
import { useState } from 'react'
import SideBar from '../SideBar/SideBar';
import ExamsPage from '../ExamsPage/ExamsPage';

const StudentPage = () => {
    const [selectedSection, setSelectedSection] = useState('');

    const renderContent = () => {
        if (selectedSection === 'Exams') {
            return <ExamsPage />;
        }

        else if (selectedSection === 'View Exam') {
            return (
                <Typography>
                    This is the page for "View Exam".
                </Typography>
            )
        }

        else if (selectedSection === 'Result') {
            return (
                <Typography>
                    This is the page for "Result".
                </Typography>
            )
        }

        return (
            <>
                <div className='student-welcome'>
                    <Typography variant="h6" gutterBottom>
                        Welcome, Student!
                    </Typography>
                    <Typography variant="body1">
                        Use the sidebar to manage exams and settings.
                    </Typography>
                </div>
            </>
        )
    }

    return (
        <>
            <SideBar onSectionSelect={setSelectedSection} />
            <div className='student-page'>
                <Typography variant='h4' className='student-heading'>
                    Student Dashboard
                </Typography>
                <hr className='horizontal-line' />
                <Card data-testid="student-card">
                    <CardContent>
                        {renderContent()}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default StudentPage;
