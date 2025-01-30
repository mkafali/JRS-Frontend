import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ApplicationCard from './ApplicationCard';

const ApplicationsView = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // "ALL", "PENDING", "REVIEWING", "REJECTED", "ACCEPTED"
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/hr/applications');
        setApplications(response.data);
      } catch (err) {
        console.error(err);
        setError('Applications fetch failed');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);


  const getFilteredApplications = () => {
    if (filterStatus === 'ALL') return applications;
    return applications.filter((app) => app.status === filterStatus);
  };

  if (loading) return <div>Loading (applications)...</div>;
  if (error) return <div>{error}</div>;

  const filteredApps = getFilteredApplications();

  return (
    <div style={styles.container}>
      <h2>Applications</h2>

      
      <div style={styles.filterContainer}>
        <label><b>Filter by Status: </b></label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={styles.select}
        >
          <option value="ALL">ALL</option>
          <option value="REVIEWING">REVIEWING</option>
          <option value="REJECTED">REJECTED</option>
          <option value="ACCEPTED">ACCEPTED</option>
        </select>
      </div>

      
      <div style={styles.cardList}>
        {filteredApps.map((app, index) => (
          <ApplicationCard key={index} application={app} />
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

export default ApplicationsView;
