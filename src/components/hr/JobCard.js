import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ jobResponse }) => {
  const navigate = useNavigate();

  // jobResponse = { jobPost: { jobId, jobTitle, jobDescription, company, ... } }
  const jp = jobResponse

  //console.log(jp)

  const handleCardClick = () => {
    
    navigate(`/hr/jobs/${jp.jobId}`, {
      state: { jobData: jp },
    });
  };

  return (
    <div style={styles.card} onClick={handleCardClick}>
      <h3>{jp?.jobTitle}</h3>
      <p><b>Company:</b> {jp?.company?.name}</p>
      <p><b>Required Skills:</b> {jp?.requiredSkills}</p>
      <p><b>Experienced:</b> {jp?.experienced ? 'Yes' : 'No'}</p>
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

export default JobCard;
