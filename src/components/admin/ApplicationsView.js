import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const ApplicationsView = () => {
    const navigate = useNavigate()

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtre
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    const fetchApps = async () => {
      try {
        // GET /admin/applications => pending apps
        const response = await axios.get('/admin/applications');
        setApplications(response.data); // List<ApplicationResponse>
      } catch (err) {
        console.error(err);
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  
  const getFilteredApps = () => {
    if (filterStatus === 'ALL') return applications;
    
    return applications.filter((appResp) => appResp.application?.status === filterStatus);
  };

  // PUT /admin/applications/{id}
  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      await axios.put(`/admin/applications/${applicationId}`, {
        status: newStatus,
      });
      alert('Application updated!');
      // optionally refetch
    } catch (err) {
      console.error(err);
      alert('Failed to update application');
    }
  };

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  const filteredApps = getFilteredApps();

  return (
    <div style={styles.container}>
      <h2>Applications</h2>


      {filteredApps.map((appResp, index) => {
        //console.log(appResp)
        return (
          <div key={index} style={styles.appCard} onClick={() => 
            navigate(`/admin/applications/${appResp.applicationId}`)}>
            <p><b>Application ID:</b> {appResp.applicationId}</p>
            <p><b>Candidate ID:</b> {appResp.candidate?.candidateId} - {appResp.candidate?.user?.firstName} {appResp.candidate?.user?.lastName}</p>
            <p><b>Job Title:</b> {appResp.jobPost?.jobTitle}</p>
            <p><b>Status:</b> {appResp.status}</p>
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
    maxWidth: '700px',
  },
  filterContainer: {
    marginBottom: '10px',
  },
  select: {
    marginLeft: '6px',
    padding: '4px',
  },
  appCard: {
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '6px',
    marginBottom: '10px',
    cursor : 'pointer'
  },
  button: {
    marginRight: '10px',
    padding: '6px 10px',
    cursor: 'pointer',
  },
};

export default ApplicationsView;
