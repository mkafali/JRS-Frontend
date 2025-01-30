import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const CandidateDetail = () => {
  const { candidateId } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [foundJobs, setFoundJobs] = useState([]);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`/admin/candidates/${candidateId}`);
        setCandidate(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch candidate');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  const handleFindJobs = async () => {
    try {
      const response = await axios.get(`/admin/jobs/candidate?candidateId=${candidateId}`);
      setFoundJobs(response.data); // List<LevenshteinJobResponse>
    } catch (err) {
      console.error(err);
      alert('Failed to find jobs for this candidate');
    }
  };

  const handleSuggestJob = async (jobId) => {
    try {
      await axios.post(`/admin/suggestions/${candidateId}/${jobId}`);
      alert('Job suggested successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to suggest job');
    }
  };

  if (loading) return <div>Loading candidate detail...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;
  if (!candidate) return <div>No candidate data</div>;

  return (
    <div style={styles.container}>
      <h2>Candidate Detail</h2>
      <div style={styles.detailCard}>
        <p><b>Name:</b> {candidate.firstName} {candidate.lastName}</p>
        <p><b>Email:</b> {candidate.email}</p>
        <p><b>Skills:</b> {candidate.skills}</p>
        <p><b>Experienced:</b> {candidate.experienced ? 'Yes' : 'No'}</p>
        <h3>Resume</h3>
        <div style={styles.resumeCard}>
          <p>{candidate.resumeText}</p>
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
    margin: '0 auto 20px',
  },
  resumeCard: {
    border: '1px solid #ccc',
    padding: '10px',
    marginTop: '10px',
  },
  button: {
    backgroundColor: '#e55039',
    border : "none",
    color :  "white",
    padding: '8px 16px',
    margin: '10px',
    cursor: 'pointer',
  },
  jobCard: {
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '6px',
    maxWidth: '600px',
    margin: '10px auto 10px',
    textAlign: 'left',
  },
  suggestButton: {
    marginTop: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
  }
};

export default CandidateDetail;
