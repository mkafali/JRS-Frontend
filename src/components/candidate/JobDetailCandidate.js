import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const JobDetailCandidate = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET /candidate/jobs/job/{jobId}
  useEffect(() => {
    //console.log(jobId)
    const fetchJob = async () => {
      try {
        const resp = await axios.get(`/candidate/jobs/job/${jobId}`);
        //console.log(resp)
        setJob(resp.data); 
      } catch (err) {
        console.error(err);
        setError('Failed to fetch job detail');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  // APPLY
  const handleApply = async () => {
    if (!job) {
      alert('No job data. Cannot apply.');
      return;
    }
    try {
      await axios.post('/candidate/applications', { jobId: job.jobId });
      alert('Applied successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to apply for this job');
    }
  };

  if (loading) return <div>Loading job detail...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!job) return <div>No job found</div>;

  return (
    <div style={styles.container}>
      <h2>Job Detail</h2>
      <div style={styles.detailCard}>
        <p><b>Job ID:</b> {job.jobId}</p>
        <p><b>Title:</b> {job.jobTitle}</p>
        <p><b>Company:</b> {job.company?.name}</p>
        <p><b>Experienced:</b> {job.experienced ? 'Yes' : 'No'}</p>
        <p><b>Required Skills:</b> {job.requiredSkills}</p>
        
        <h3>Description</h3>
        <div style={styles.detailCard}>
          <p>{job.jobDescription}</p>
        </div>
      </div>

      <button onClick={handleApply} style={styles.applyButton}>
        Apply
      </button>
      <br />
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
    maxWidth: '600px',
    margin: '0 auto 20px',
    textAlign: 'left',
  },
  applyButton: {
    padding: '8px 16px',
    marginRight: '10px',
    cursor: 'pointer',
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
  },
  button: {
    backgroundColor : "#e55039",
    border : "none",
    color : "white",
    padding: '8px 16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default JobDetailCandidate;

