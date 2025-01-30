import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const ApplicationDetailAdmin = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        // GET /admin/applications/{id}
        const response = await axios.get(`/admin/applications/${applicationId}`);
        
        setApplication(response.data);
        setNewStatus(response.data.status); 
      } catch (err) {
        console.error(err);
        setError('Failed to fetch application detail');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  // PUT => /admin/applications/{id}
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/admin/applications/${applicationId}`, {
        status: newStatus,
      });
      alert('Application updated!');
      navigate("/");
    } catch (err) {
      console.error(err);
      alert('Failed to update application');
    }
  };

  if (loading) return <div>Loading application detail...</div>;
  if (error) return <div style={{ color:'red' }}>{error}</div>;
  if (!application) return <div>No application data</div>;

  //console.log(application)

  const { candidate, jobPost, status } = application;

  return (
    <div style={styles.container}>
      <h2>Application Detail</h2>
      <div style={styles.detailCard}>
        <p><b>Application ID:</b> {application.applicationId}</p>
        <p><b>Current Status:</b> {status}</p>
        </div>

    <h2>CANDIDATE</h2>
        <div style={styles.detailCard}>
        {/* Candidate */}
        <h3>Candidate</h3>
        <p><b>Name:</b> {candidate?.user?.firstName} {candidate?.user?.lastName}</p>
        <p><b>Skills:</b> {candidate?.skills}</p>
        <p><b>Experienced:</b> {candidate?.experienced ? 'Yes' : 'No'}</p>
        <h3>RESUME</h3>
        <div style={styles.resumeBox}>
          <p>{candidate?.resumeText}</p>
        </div>
        </div>

    <h2>JOB</h2>
        <div style={styles.detailCard}>
        {/* Job */}
        <h3>Job</h3>
        <p><b>Title:</b> {jobPost?.jobTitle}</p>
        <p><b>Company:</b> {jobPost?.company?.name}</p>
        <p><b>Required Skills:</b> {jobPost?.requiredSkills}</p>
        <h3>Details</h3>
        <div style={styles.detailCard}>
            <p>{jobPost.jobDescription}</p>
        </div>
      </div>

      {/* Status Update Form */}
      <form onSubmit={handleUpdateStatus} style={styles.form}>
        <h3>Update Status</h3>
        <label style={styles.label}>New Status:</label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          style={styles.select}
        >
           <option value=""></option> 
          <option value="REVIEWING">REVIEWING</option>
          <option value="REJECTED">REJECTED</option>
        </select>
        <button type="submit" style={styles.button}>Update</button>
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
    margin: '0 auto 20px auto'
  },
  resumeBox: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    marginTop: '10px',
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
    marginBottom: '4px',
    marginTop: '10px',
    fontWeight: 'bold',
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

export default ApplicationDetailAdmin;
