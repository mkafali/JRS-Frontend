import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import CandidateCard from './CandidateCard';

const CandidatesView = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('/admin/candidates');
        setCandidates(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) return <div>Loading Candidates...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>All Candidates</h2>
      <div style={styles.cardList}>
        {candidates.map((cand) => (
          <CandidateCard key={cand.candidateId} candidate={cand} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '700px',
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
};

export default CandidatesView;
