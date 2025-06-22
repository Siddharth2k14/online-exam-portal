import { useLocation, useParams } from "react-router-dom";

const StartExam = () => {
    const location = useLocation();
    const { examTitle } = useParams();
    const exam = location.state?.exam;

    if (!exam) {
        return <div>No exam data found for "{examTitle}". Please start the exam from the exams list.</div>;
    }

    return (
        <div>
            <h1>Start Exam: {exam.exam_title}</h1>
            <p>Type: {exam.type}</p>
            <p>Number of Questions: {exam.questions.length}</p>
            {/* Render questions or exam content here */}
        </div>
    );
};

export default StartExam;