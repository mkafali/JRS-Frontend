import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const ApplicationsViewCandidate = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // local filter
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('/candidate/applications');
        setApplications(resp.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFilteredApps = () => {
    if (filterStatus === 'ALL') return applications;
    return applications.filter((app) => app.status === filterStatus);
  };

  const handleDetail = (applicationId) => {
    // navigate to /candidate/candidate/applications/:applicationId
    navigate(`/candidate/applications/${applicationId}`);
  };

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const filteredApps = getFilteredApps();

  return (
    <div style={styles.container}>
      <h2>My Applications</h2>

      <div style={styles.filterRow}>
        <label>Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={styles.select}
        >
          <option value="ALL">ALL</option>
          <option value="PENDING">PENDING</option>
          <option value="REVIEWING">REVIEWING</option>
          <option value="REJECTED">REJECTED</option>
          <option value="ACCEPTED">ACCEPTED</option>
        </select>
      </div>

      {filteredApps.map((app, idx) => {
        // app: { applicationId, candidate, jobPost, status, companyName }
        return (
          <div 
            key={idx}
            style={styles.appCard}
            onClick={() => handleDetail(app.applicationId)}
          >
            <p><b>Application ID:</b> {app.applicationId}</p>
            <p><b>Job Title:</b> {app.jobPost?.jobTitle}</p>
            <p><b>Company:</b> {app.companyName}</p>
            <p><b>Status:</b> {app.status}</p>
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
  appCard: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
};

export default ApplicationsViewCandidate;
