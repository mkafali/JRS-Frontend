import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const InterviewDetail = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');

  const displayDate = interview?.interviewDate?.replace('T', ' ');

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await axios.get(`/hr/interviews/${interviewId}`);
        setInterview(response.data);
        setNewStatus(response.data.status);
        setNotes(response.data.notes || '');
      } catch (err) {
        console.error(err);
        setError('Failed to fetch interview');
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);


  if (loading) return <div>Wait (Interview Detail)...</div>;
  if (error) return <div>{error}</div>;
  if (!interview) return <div>No interview data</div>;

  //console.log(interview)

  return (
    <div style={styles.container}>
      <h2>Interview Detail</h2>

      <div style={styles.detailCard}>
        <p><b>Company:</b> {interview.application?.companyName}</p>
        <p><b>Interview Date:</b> {displayDate}</p>
        <p><b>Current Status:</b> {interview.status}</p>
        <p><b>Notes:</b> {interview.notes}</p>
      </div>

      <h2>JOB</h2>

      <div style={styles.detailCard}>
        <p><b>Title:</b> {interview.application.jobPost.jobTitle}</p>
        <p><b>Requied:</b> {interview.application.jobPost.requiredSkills}</p>
        <h3>DESCRIPTION</h3>
        <div style={styles.detailCard}>
        <p>{interview.application.jobPost.jobDescription}</p>
        </div>
      </div>

      <h2>CANDIDATE</h2>

      <div style={styles.detailCard}>
      <p><b>Name:</b> {interview.application?.candidate?.user?.firstName} {interview.application?.candidate?.user?.lastName}</p>
      <p><b>Skills:</b> {interview.application.candidate?.skills}</p>
        <h3>Resume</h3>
        <div style={styles.detailCard}>
        <p>{interview.application.candidate.resumeText}</p>
        </div>
      </div>


      <button onClick={() => navigate(-1)} style={styles.button}>
        Go Back
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  detailCard: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '6px',
    textAlign: 'left',
    maxWidth: '600px',
    margin: '0 auto 20px auto'
  },
  form: {
    margin: '0 auto',
    maxWidth: '600px',
    textAlign: 'left',
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
  },
  select: {
    display: 'block',
    margin: '10px 0',
    padding: '5px',
  },
  button: {
    backgroundColor: '#e55039',
    border : "none",
    color :  "white",
    padding: '8px 16px',
    margin: '10px 0',
    cursor: 'pointer',
  }
};

export default InterviewDetail;
