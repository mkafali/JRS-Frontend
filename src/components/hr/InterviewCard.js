import React from 'react';
import { useNavigate } from 'react-router-dom';

const InterviewCard = ({ interview }) => {
  const navigate = useNavigate();

  //console.log(interview)

  const handleCardClick = () => {
    
    navigate(`/hr/interviews/${interview.interviewId}`);
  };

  const displayDate = interview.interviewDate?.replace('T', ' ');
  
  return (
    <div style={styles.card} onClick={handleCardClick}>
      <h3>Interview</h3>
      <p><b>Id:</b> {interview.interviewId} </p>
      <p><b>Candidate:</b> {interview.application?.candidate?.user?.firstName} {interview.application?.candidate?.user?.lastName}</p>
      <p><b>Company:</b> {interview.application?.companyName}</p>
      <p><b>Interview Date:</b> {displayDate}</p>
      <p><b>Status:</b> {interview.status}</p>
      <p><b>Notes:</b> {interview.notes}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default InterviewCard;
