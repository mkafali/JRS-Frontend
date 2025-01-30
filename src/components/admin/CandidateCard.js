import React from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateCard = ({ candidate }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`admin/candidates/${candidate.candidateId}`);
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <h3>{candidate.firstName} {candidate.lastName}</h3>
      <p><b>Email:</b> {candidate.email}</p>
      <p><b>Skills:</b> {candidate.skills}</p>
      <p><b>Experienced:</b> {candidate.experienced ? 'Yes' : 'No'}</p>
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

export default CandidateCard;
