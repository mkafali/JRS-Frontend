import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const ApplicationDetailCandidate = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      //console.log(applicationId)
      try {
        // GET /candidate/applications/{id}
        const resp = await axios.get(`/candidate/applications/${applicationId}`);
        //console.log(resp)
        setApplication(resp.data); 
      } catch (err) {
        console.error(err);
        setError('Failed to fetch application detail');
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [applicationId]);

  if (loading) return <div>Loading application detail...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (!application) return <div>No application data</div>;

  // application: 
  // {
  //   applicationId, candidate, jobPost, status, companyName
  // }


  return (
    <div style={styles.container}>
      <h2>Application Detail</h2>

      <div style={styles.detailCard}>
        <p><b>Application ID:</b> {application.applicationId}</p>
        
        <p><b>Job Title:</b> {application.jobPost?.jobTitle}</p>
        <p><b>Company:</b> {application.companyName}</p>
        <p><b>Application Status:</b> {application.status}</p>
        <p><b>Requied:</b> {application.jobPost.requiredSkills}</p>
        <h3>Description</h3>
        <div style={styles.detailCard}>
            <p>{application.jobPost.jobDescription}</p>
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
    maxWidth: '600px',
    margin: '0 auto 20px',
    textAlign: 'left',
  },
  button: {
    backgroundColor : "#e55039",
    border : "none",
    color : "white",
    padding: '8px 16px',
    cursor: 'pointer',
  },
};

export default ApplicationDetailCandidate;
