import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const InterviewsViewAdmin = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status filter
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Candidate filter
  const [candidates, setCandidates] = useState([]);
  const [candidateFilter, setCandidateFilter] = useState('ALL');

  const displayDate = (interview) => interview.interviewDate?.replace('T', ' ');

  useEffect(() => {
    
    const fetchInterviews = async () => {
      try {
        const resp = await axios.get('/admin/interviews');
        setInterviews(resp.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch interviews (admin)');
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();

    // 2) Candidate list
    const fetchCandidates = async () => {
      try {
        const resp = await axios.get('/admin/candidates');
        setCandidates(resp.data);
      } catch (err) {
        console.error('Failed to fetch candidates for filter', err);
      }
    };
    fetchCandidates();
  }, []);

  
  const getFilteredInterviews = () => {
    let filtered = [...interviews];

    // status
    if (statusFilter !== 'ALL') {
        if (statusFilter === 'TIME') {
            // Make a copy
            const sorted = [...interviews];
            sorted.sort((a, b) => {
              // new Date(a.interviewDate) - new Date(b.interviewDate)
              // ascending
              return new Date(a.interviewDate) - new Date(b.interviewDate);
            });
            return sorted;
          }
        else{
            filtered = filtered.filter(iv => iv.status === statusFilter);
        }
      
    }

    // candidate
    if (candidateFilter !== 'ALL') {
      filtered = filtered.filter(iv => {
        return (
          iv.application?.candidate?.candidateId?.toString() === candidateFilter
        );
      });
    }

    return filtered;
  };

  const filteredInterviews = getFilteredInterviews();

  
  const handleCardClick = (iv) => {
    //console.log(iv)
    navigate(`/admin/interviews/${iv.interviewId}`);
  };

  if (loading) return <div>Loading Admin Interviews...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>Interviews</h2>

      {/* STATUS FILTER */}
      <div style={styles.filterRow}>
        <label><b>Status / Sort:</b></label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.select}
        >
          <option value="ALL">ALL</option>
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="PASSED">PASSED</option>
          <option value="FAILED">FAILED</option>
          <option value="CANCELED">CANCELED</option>
          <option value="TIME">TIME (Sort by date)</option>
        </select>
      </div>

      {/* CANDIDATE FILTER */}
      <div style={styles.filterRow}>
        <label><b>Candidate:</b></label>
        <select
          value={candidateFilter}
          onChange={(e) => setCandidateFilter(e.target.value)}
          style={styles.select}
        >
          <option value="ALL">ALL</option>
          {candidates.map((cand) => (
            <option key={cand.candidateId} value={cand.candidateId}>
              {cand.firstName} {cand.lastName}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.list}>
        {filteredInterviews.map((iv, idx) => (
          <div
            key={idx}
            style={styles.card}
            onClick={() => handleCardClick(iv)}
          >
            <p><b>Interview ID:</b> {iv.interviewId}</p>
            <p>
              <b>Candidate:</b> {iv.application?.candidate?.user?.firstName}{' '}
              {iv.application?.candidate?.user?.lastName}
            </p>
            <p><b>Date:</b> {displayDate(iv)}</p>
            <p><b>Status:</b> {iv.status}</p>
          </div>
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
  filterRow: {
    marginBottom: '10px',
  },
  select: {
    marginLeft: '6px',
    padding: '4px',
  },
  list: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default InterviewsViewAdmin;
