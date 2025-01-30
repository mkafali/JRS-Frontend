import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import InterviewCard from './InterviewCard';

const InterviewsView = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // "ALL", "SCHEDULED", "PASSED", "FAILED", "CANCELED", "TIME"
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('/hr/interviews');
        setInterviews(response.data);
      } catch (err) {
        console.error(err);
        setError('Interviews fetch failed');
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  // Filtre + Sort
  const getFilteredInterviews = () => {
    // "TIME" => sort by date ascending
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

    // Normal status filter
    if (filterStatus === 'ALL') return interviews;
    return interviews.filter((iv) => iv.status === filterStatus);
  };

  if (loading) return <div>Loading (interviews)...</div>;
  if (error) return <div>{error}</div>;

  const filteredInterviews = getFilteredInterviews();

  return (
    <div style={styles.container}>
      <h2>Interviews</h2>

      {/* Filtre/Sort Dropdown */}
      <div style={styles.filterContainer}>
        <label><b>Filter / Sort: </b></label>
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

      {/* List */}
      <div style={styles.cardList}>
        {filteredInterviews.map((interv, index) => (
          // InterviewCard => navigate detail
          // or you can inline the logic
          <InterviewCard key={index} interview={interv} />
        ))}
      </div>
    </div>
  );
};
const styles = {
  container: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '600px',
  },
  filterContainer: {
    marginBottom: '10px',
  },
  select: {
    marginLeft: '6px',
    padding: '4px',
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
};

export default InterviewsView;
