import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const InterviewDetailCandidate = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(`/candidate/interviews/${interviewId}`);
        setInterview(resp.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch interview detail');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [interviewId]);

  const displayDate = (interview) => interview.interviewDate?.replace('T', ' ');

  if (loading) return <div>Loading interview detail...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!interview) return <div>No interview data</div>;

  return (
    <div style={styles.container}>
      <h2>Interview Detail</h2>

    <div style={styles.card}>
    <p><b>Interview ID:</b> {interview.interviewId}</p>
    <p><b>Date:</b> {displayDate(interview)}</p>
    <p><b>Current Status:</b> {interview.status}</p>
    <p><b>Notes:</b> {interview.notes}</p>
    </div>


    <h3>Job</h3>
    <div style={styles.card}>
    <p><b>Title:</b> {interview.application?.jobPost?.jobTitle}</p>
    <p><b>Description:</b> {interview.application?.jobPost?.jobDescription}</p>
    <p><b>Required Skills:</b> {interview.application?.jobPost?.requiredSkills}</p>
    <h3>Description</h3>
    <div style={styles.card}>
        <p>{interview.application.jobPost.jobDescription}</p>
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
  card: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '6px',
    textAlign: 'left',
    maxWidth: '600px',
    margin: '0 auto 20px',
  },
  button: {
    backgroundColor : "#e55039",
    border : "none",
    color : "white",
    padding: '8px 16px',
    cursor: 'pointer',
  },
};

export default InterviewDetailCandidate;
