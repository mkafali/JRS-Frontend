import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const jobData = state?.jobData;

  const [error, setError] = useState(null);

  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState(null);
  
  const [interviews, setInterviews] = useState([]);
  const [interviewsLoading, setInterviewsLoading] = useState(false);
  const [interviewsError, setInterviewsError] = useState(null);

  
  const [applicationFilter, setApplicationFilter] = useState('ALL');
  const [interviewFilter, setInterviewFilter] = useState('ALL');

  const handleDelete = async () => {
    try {
      await axios.delete(`/hr/jobs/${jobId}`);
      alert('Job deleted successfully!');
      navigate(-1); 
    } catch (err) {
      console.error(err);
      setError('Failed to delete job');
    }
  };


  const handleLoadApplications = async () => {
    setApplicationsLoading(true);
    setApplicationsError(null);

    try {
      const response = await axios.get(`/hr/applications/jobs/${jobId}`);
      //console.log(response)
      const filtered = response.data.filter(app => app.status !== 'PENDING');
      setApplications(filtered);
    } catch (err) {
      console.error(err);
      setApplicationsError('Failed to load applications');
    } finally {
      setApplicationsLoading(false);
    }
  };

  const displayDate = (interview) => interview.interviewDate?.replace('T', ' ');

  
  const getFilteredApplications = () => {
    if (applicationFilter === 'ALL') return applications;
    return applications.filter((app) => app.status === applicationFilter);
  };


  const handleLoadInterviews = async () => {
    setInterviewsLoading(true);
    setInterviewsError(null);

    try {
      const response = await axios.get(`/hr/interviews/jobs/${jobId}`);
      setInterviews(response.data);
    } catch (err) {
      console.error(err);
      setInterviewsError('Failed to load interviews');
    } finally {
      setInterviewsLoading(false);
    }
  };

  

  
  const getFilteredInterviews = () => {
    if (interviewFilter === 'ALL') return interviews;
    return interviews.filter((iv) => iv.status === interviewFilter);
  };

  return (
    <div style={styles.container}>
      <h2>Job Detail</h2>

      {error && <div style={styles.error}>{error}</div>}

      
      {jobData ? (
        <div style={styles.detailCard}>
          <p><b>Job Title:</b> {jobData.jobTitle}</p>
          <p><b>Company:</b> {jobData.company?.name}</p>
          <p><b>Description:</b> {jobData.jobDescription}</p>
          <p><b>Required Skills:</b> {jobData.requiredSkills}</p>
          <p><b>Experienced:</b> {jobData.experienced ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <div style={styles.detailCard}>
          <p>No job data passed from listing (ID: {jobId}).</p>
          <p>You can still delete it if you wish.</p>
        </div>
      )}

      
      <button onClick={handleDelete} style={styles.button}>
        Delete Job
      </button>
      <br />
      <button onClick={() => navigate(-1)} style={styles.goBackButton}>
        Go Back
      </button>

      
      <hr style={styles.hr} />
      <h3>Applications for this Job</h3>
      <button onClick={handleLoadApplications} style={styles.button}>
        Load Applications
      </button>
      {applicationsLoading && <div>Loading applications...</div>}
      {applicationsError && <div style={styles.error}>{applicationsError}</div>}

      {/* Status Filter DropDown */}
      {applications.length > 0 && (
        <div style={styles.filterContainer}>
          <label><b>Filter by Status:</b></label>
          <select
            value={applicationFilter}
            onChange={(e) => setApplicationFilter(e.target.value)}
            style={styles.select}
          >
            <option value="ALL">ALL</option>
            <option value="REVIEWING">REVIEWING</option>
            <option value="REJECTED">REJECTED</option>
            <option value="ACCEPTED">ACCEPTED</option>
          </select>
        </div>
      )}

      
      {getFilteredApplications().map((app, idx) => (
        <div key={idx} style={styles.itemCard}>
          <p><b>Candidate:</b> {app.candidate?.user?.firstName} {app.candidate?.user?.lastName}</p>
          <p><b>Status:</b> {app.status}</p>
          <p><b>Company Name:</b> {app.companyName}</p>
          <button
            style={styles.smallButton}
            onClick={() => navigate(`/hr/applications/${app.applicationId}`)}
          >
            Go to Application Detail
          </button>
        </div>
      ))}

      
      <hr style={styles.hr} />
      <h3>Interviews for this Job</h3>
      <button onClick={handleLoadInterviews} style={styles.button}>
        Load Interviews
      </button>
      {interviewsLoading && <div>Loading interviews...</div>}
      {interviewsError && <div style={styles.error}>{interviewsError}</div>}

      {/* Status Filter DropDown */}
      {interviews.length > 0 && (
        <div style={styles.filterContainer}>
          <label><b>Filter by Status:</b></label>
          <select
            value={interviewFilter}
            onChange={(e) => setInterviewFilter(e.target.value)}
            style={styles.select}
          >
            <option value="ALL">ALL</option>
            <option value="SCHEDULED">SCHEDULED</option>
            <option value="PASSED">PASSED</option>
            <option value="FAILED">FAILED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>
      )}

      
      {getFilteredInterviews().map((iv, idx) => (
        <div key={idx} style={styles.itemCard}>
          <p><b>Candidate:</b> {iv.application?.candidate?.user?.firstName} {iv.application?.candidate?.user?.lastName}</p>
          <p><b>Interview Date:</b> {displayDate(iv)}</p>
          <p><b>Status:</b> {iv.status}</p>
          <button
            style={styles.smallButton}
            onClick={() => navigate(`/hr/interviews/${iv.interviewId}`)}
          >
            Go to Interview Detail
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    margin: '10px 0',
  },
  detailCard: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '6px',
    textAlign: 'left',
    maxWidth: '600px',
    margin: '0 auto 20px auto',
  },
  button: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    marginTop: '10px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  hr: {
    margin: '20px 0',
    width: '80%',
  },
  filterContainer: {
    margin: '10px 0',
  },
  select: {
    marginLeft: '8px',
    padding: '4px',
  },
  itemCard: {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '6px',
    textAlign: 'left',
    maxWidth: '600px',
    margin: '0 auto 10px',
  },
  smallButton: {
    backgroundColor: '#fa983a',
    border : "none",
    color :  "white",
    padding: '4px 8px',
    marginTop: '6px',
    cursor: 'pointer',
  },
  goBackButton : {
    backgroundColor: '#e55039',
    border : "none",
    color :  "white",
    marginTop: '10px',
    padding: '8px 16px',
    cursor: 'pointer',
  }
};

export default JobDetail;
