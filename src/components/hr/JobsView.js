import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import JobCard from './JobCard';
import CreateJobForm from './CreateJobForm'; // POST Job

const JobsView = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/hr/jobs');
      setJobs(response.data);
    } catch (err) {
      console.error(err);
      setError('Jobs fetch failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <div>Loading (jobs)...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>Job Posts</h2>
      <CreateJobForm onJobCreated={fetchJobs} />

      <div style={styles.cardList}>
        {jobs.slice().reverse().map((jobResp, index) => (
          <JobCard key={index} jobResponse={jobResp} />
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
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
};

export default JobsView;
