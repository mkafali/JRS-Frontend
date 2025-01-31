import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const ApplicationDetail = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [interviewDate, setInterviewDate] = useState('');
  const [notes, setNotes] = useState('');

  const [isScheduled, setIsScheduled] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        // GET /hr/applications/{applicationId}
        const response = await axios.get(`/hr/applications/${applicationId}`);
        setApplication(response.data);
        setIsScheduled(response.data.hasInterview);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch application (maybe it is PENDING?)');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  const handleScheduleInterview = async (e) => {
    e.preventDefault();
    try {
      
      const isoString = interviewDate.replace(' ', 'T');

      const requestBody = {
        applicationId: parseInt(applicationId, 10),
        interviewDate: isoString, // "2025-02-01T15:00:00"
        notes,
      };

      await axios.post('/hr/interviews', requestBody);
      alert('Interview scheduled successfully!');

      setInterviewDate('');
      setNotes('');
      setIsScheduled(true);
    } catch (err) {
      console.error(err);
      alert('Failed to schedule interview');
    }
  };

  if (loading) return <div>Loading Application Detail...</div>;
  if (error) return <div>{error}</div>;
  if (!application) return <div>No application data</div>;

  return (
    <div style={styles.container}>
      <h2>Application Detail</h2>
      <div style={styles.detailCard}>
        <p><b>Company:</b> {application.companyName}</p>
        <p><b>Current Status:</b> {application.status}</p>
      </div>

      <h2>JOB</h2>
      <div style={styles.detailCard}>
        <p><b>Title:</b> {application.jobPost?.jobTitle}</p>
        <p><b>Required Skills:</b> {application.jobPost?.requiredSkills}</p>
        <h3>DESCRIPTION</h3>
        <div style={styles.detailCard}>
          <p>{application.jobPost?.jobDescription}</p>
        </div>
      </div>

      <h2>CANDIDATE</h2>
      <div style={styles.detailCard}>
        <p>
          <b>Name:</b> {application.candidate?.user?.firstName}{' '}
          {application.candidate?.user?.lastName}
        </p>
        <p><b>Skills:</b> {application.candidate?.skills}</p>
        <h3>Resume</h3>
        <div style={styles.detailCard}>
          <p>{application.candidate?.resumeText}</p>
        </div>
      </div>

      {isScheduled ? (
        <div style={styles.interviewMessage}>
          <p>You have already scheduled an interview for this application. Check your interviews page</p>
        </div>
      ) : (
        <form onSubmit={handleScheduleInterview} style={styles.form}>
          <h3>Set Interview</h3>

          <label style={styles.label}>
            Interview Date (e.g. 2025-02-01 15:00:00)
          </label>
          <input
            type="text"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            style={styles.input}
            placeholder="YYYY-MM-DD HH:mm:ss"
            required
          />

          <label style={styles.label}>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button}>
            Schedule Interview
          </button>
        </form>
      )}


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
  label: {
    display: 'block',
    margin: '10px 0 4px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '6px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '6px',
    boxSizing: 'border-box',
    resize: 'vertical',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    padding: '8px 16px',
    margin: '10px 0',
    cursor: 'pointer',
  },
  goBackButton : {
    backgroundColor: '#e55039',
    border : "none",
    color :  "white",
    padding: '8px 16px',
    margin: '10px 0',
    cursor: 'pointer',
  }
};

export default ApplicationDetail;
