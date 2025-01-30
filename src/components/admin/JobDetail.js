import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';


const JobDetailAdmin = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Candidate list for "Suggest"
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');

  useEffect(() => {
    // 1) Fetch single job
    const fetchJob = async () => {
      try {
        const resp = await axios.get(`/admin/jobs/job/${jobId}`);
        setJob(resp.data); 
      } catch (err) {
        console.error(err);
        setError('Failed to fetch job detail');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();

    // 2) Candidate list
    const fetchCandidates = async () => {
      try {
        const resp = await axios.get('/admin/candidates');
        setCandidates(resp.data);
      } catch (err) {
        console.error('Failed to fetch candidates');
      }
    };
    fetchCandidates();
  }, [jobId]);

  // Suggest
  const handleSuggest = async () => {
    if (!job) {
      alert('No job data. Cannot suggest');
      return;
    }
    if (!selectedCandidate) {
      alert('Please select a candidate');
      return;
    }
    try {
      await axios.post(`/admin/suggestions/${selectedCandidate}/${job.jobId}`);
      alert('Suggested successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to suggest job');
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
        <p><b>Skills:</b> {job.requiredSkills}</p>
        <h3>Description</h3>
        <div style={styles.detailCard}>
          <p>{job.jobDescription}</p>
        </div>
      </div>

      {/* Suggest form */}
      <div style={styles.formBlock}>
        <label><b>Select Candidate:</b></label>
        <select
          value={selectedCandidate}
          onChange={(e) => setSelectedCandidate(e.target.value)}
          style={styles.select}
        >
          <option value="">-- select --</option>
          {candidates.map((cand) => (
            <option key={cand.candidateId} value={cand.candidateId}>
              {cand.firstName} {cand.lastName} (ID: {cand.candidateId})
            </option>
          ))}
        </select>

        <button onClick={handleSuggest} style={styles.button}>
          Suggest This Job
        </button>

        <button onClick={() => navigate(-1)} style={styles.goBackButton}>Go Back</button>
      </div>

      
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
  formBlock: {
    textAlign: 'left',
    maxWidth: '600px',
    margin: '0 auto 20px',
  },
  select: {
    display: 'block',
    margin: '10px 0',
    padding: '6px',
  },
  button: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    display: 'block',
    padding: '8px 16px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  goBackButton: {
    backgroundColor: '#e55039',
    border : "none",
    color :  "white",
    display: 'block',
    padding: '8px 16px',
    marginTop: '10px',
    cursor: 'pointer',
  },
};

export default JobDetailAdmin;
