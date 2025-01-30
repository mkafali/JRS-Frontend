import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const InterviewsViewCandidate = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('/candidate/interviews');
        setInterviews(resp.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch interviews');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayDate = (interview) => interview.interviewDate?.replace('T', ' ');

  const getFilteredInterviews = () => {
    if (filterStatus === 'TIME') {
        // Make a copy
        const sorted = [...interviews];
        sorted.sort((a, b) => {
          // new Date(a.interviewDate) - new Date(b.interviewDate)
          // ascending
          return new Date(a.interviewDate) - new Date(b.interviewDate);
        });
        return sorted;
      }
    if (filterStatus === 'ALL') return interviews;
    return interviews.filter((iv) => iv.status === filterStatus);
  };

  const handleDetail = (interviewId) => {
    navigate(`/candidate/interviews/${interviewId}`);
  };

  if (loading) return <div>Loading interviews...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const filtered = getFilteredInterviews();

  return (
    <div style={styles.container}>
      <h2>My Interviews</h2>
      <div style={styles.filterRow}>
        <label>Filter / Sort:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
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

      {filtered.map((iv, idx) => {
        // iv: { interviewId, application, interviewDate, status, notes }
        return (
          <div 
            key={idx}
            style={styles.interviewCard}
            onClick={() => handleDetail(iv.interviewId)}
          >
            <p><b>Interview ID:</b> {iv.interviewId}</p>
            <p><b>Job Title:</b> {iv.application?.jobPost?.jobTitle}</p>
            <p><b>Date:</b> {displayDate(iv)}</p>
            <p><b>Status:</b> {iv.status}</p>
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
  filterRow: {
    marginBottom: '10px',
  },
  select: {
    marginLeft: '8px',
    padding: '4px',
  },
  interviewCard: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
};

export default InterviewsViewCandidate;
