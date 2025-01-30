import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const InterviewDetailAdmin = () => {
  const { interviewId } = useParams();
  //console.log(interviewId)
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form fields
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');

  const displayDate = (interview) => interview.interviewDate?.replace('T', ' ');

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        // GET /admin/interviews/{interviewId}
        //console.log(interviewId)
        const resp = await axios.get(`/admin/interviews/${interviewId}`);
        setInterview(resp.data);

        // set form fields
        setNewStatus(resp.data.status);
        setNotes(resp.data.notes || '');
      } catch (err) {
        console.error(err);
        setError('Failed to fetch interview (Admin)');
      } finally {
        setLoading(false);
      }
    };
    fetchInterview();
  }, [interviewId]);

  const handleUpdateInterview = async (e) => {
    e.preventDefault();
    try {
      // PUT /admin/interviews/{interviewId} => { status, notes? }
      // `PutInterviewRequest` in your backend should contain status + notes if you want notes updated
      const requestBody = {
        status: newStatus,
        // notes if your backend accepts it
      };
      await axios.put(`/admin/interviews/${interviewId}`, requestBody);
      alert('Interview updated successfully!');
      navigate(-1)
    } catch (err) {
      console.error(err);
      alert('Failed to update interview');
    }
  };

  if (loading) return <div>Loading interview detail (Admin)...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!interview) return <div>No interview data</div>;

  return (
    <div style={styles.container}>
      <h2>Interview Detail</h2>

      <div style={styles.detailCard}>
        <p><b>Interview ID:</b> {interview.interviewId}</p>
        <p><b>Date:</b> {displayDate(interview)}</p>
        <p><b>Current Status:</b> {interview.status}</p>
        <p><b>Notes:</b> {interview.notes}</p>
      </div>

      <h3>Candidate</h3>
      <div style={styles.detailCard}>
        <p>
          <b>Name:</b>{' '}
          {interview.application?.candidate?.user?.firstName}{' '}
          {interview.application?.candidate?.user?.lastName}
        </p>
        <p><b>Skills:</b> {interview.application?.candidate?.skills}</p>
        <h3>Resume</h3>
        <div style={styles.detailCard}>
            <p>{interview.application.candidate.resumeText}</p>
        </div>
      </div>

      <h3>Job</h3>
      <div style={styles.detailCard}>
        <p><b>Title:</b> {interview.application?.jobPost?.jobTitle}</p>
        <p><b>Description:</b> {interview.application?.jobPost?.jobDescription}</p>
        <p><b>Required Skills:</b> {interview.application?.jobPost?.requiredSkills}</p>
        <h3>Description</h3>
        <div style={styles.detailCard}>
            <p>{interview.application.jobPost.jobDescription}</p>
        </div>
      </div>

      {/* UPDATE FORM */}
      <form onSubmit={handleUpdateInterview} style={styles.form}>
        <label>Update Status:</label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          style={styles.select}
        >
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="PASSED">PASSED</option>
          <option value="FAILED">FAILED</option>
          <option value="CANCELED">CANCELED</option>
        </select>

        {/* If notes update is supported: */}
        {/* <label>Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        /> */}

        <button type="submit" style={styles.button}>
          Update Interview
        </button>
      </form>

      <button onClick={() => navigate(-1)} style={styles.goBackButton}>
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
    margin: '0 auto 20px',
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
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    padding: '8px 16px',
    margin: '10px 0',
    cursor: 'pointer',
  },
  goBackButton: {
    backgroundColor: '#e55039',
    border : "none",
    color :  "white",
    padding: '8px 16px',
    marginTop: '10px',
    cursor: 'pointer',
  },
};

export default InterviewDetailAdmin;
