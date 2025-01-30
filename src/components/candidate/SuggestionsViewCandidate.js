import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const SuggestionsViewCandidate = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const resp = await axios.get('/candidate/suggestions');
        setSuggestions(resp.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch suggestions');
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, []);

  const handleJobClick = (jobData) => {
    //console.log(jobData)
    // navigate to /candidate/candidate/jobs/:jobId 
    navigate(`/candidate/jobs/${jobData.jobId}`);
  };

  // Apply => /candidate/applications { jobId }
  const handleApply = async (jobId) => {
    try {
      await axios.post('/candidate/applications', { jobId });
      alert('Applied successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to apply');
    }
  };

  if (loading) return <div>Loading suggestions...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>My Suggestions</h2>
      {suggestions.map((sug, idx) => {
        const job = sug.job; 

        if (!job) {
          return <div key={idx} style={{ marginBottom: '10px' }}>No job info</div>;
        }

        return (
          <div key={idx} style={styles.card} onClick={() => handleJobClick(job)}>
            <p><b>Job Title:</b> {job.jobTitle}</p>
            <p><b>Company:</b> {job.company?.name}</p>
            <p><b>Skills:</b> {job.requiredSkills}</p>
            
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '600px',
  },
  card: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '10px',
    cursor : 'pointer'
  },
  applyButton: {
    marginTop: '6px',
    padding: '6px 10px',
    cursor: 'pointer',
  },
  
};

export default SuggestionsViewCandidate;
