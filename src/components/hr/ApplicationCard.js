import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();

  //console.log(application)

  const handleCardClick = () => {
    // application.applicationId -> detail page
    navigate(`/hr/applications/${application.applicationId}`);
  };

  return (
    <div style={styles.card} onClick={handleCardClick}>
      <h3>Application</h3>
      <p><b>Id:</b> {application.applicationId} </p>
      <p><b>Candidate:</b> {application?.candidate?.user?.firstName} {application?.candidate?.user?.lastName}</p>
      <p><b>Company:</b> {application.companyName}</p>
      <p><b>Status:</b> {application.status}</p>
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

export default ApplicationCard;
