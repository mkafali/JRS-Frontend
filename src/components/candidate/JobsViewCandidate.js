import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const JobsViewCandidate = () => {
  const navigate = useNavigate();

  // activeMode: '', 'SKILL', 'ME', 'ALL'
  const [activeMode, setActiveMode] = useState('');

  // 1) skill search
  const [skillInput, setSkillInput] = useState('');
  const [skillResults, setSkillResults] = useState([]);
  const [skillError, setSkillError] = useState(null);
  const [skillLoading, setSkillLoading] = useState(false);

  // 2) "My" jobs (LevenshteinJobResponse)
  const [myJobs, setMyJobs] = useState([]);
  const [myJobsError, setMyJobsError] = useState(null);

  // 3) all jobs
  const [allJobs, setAllJobs] = useState([]);
  const [allJobsError, setAllJobsError] = useState(null);


  const handleSkillSearch = async () => {
    if (!skillInput.trim()) {
      alert('Please enter skill(s)');
      return;
    }
    setActiveMode('SKILL');
    setMyJobs([]);
    setAllJobs([]);
    setMyJobsError(null);
    setAllJobsError(null);

    setSkillLoading(true);
    setSkillError(null);
    try {
      const resp = await axios.get(`/candidate/jobs/${skillInput}`);
      setSkillResults(resp.data);
    } catch (err) {
      console.error(err);
      setSkillError('Skill search failed');
    } finally {
      setSkillLoading(false);
    }
  };


  const handleLoadMyJobs = async () => {
    setActiveMode('ME');
    setSkillResults([]);
    setAllJobs([]);
    setSkillError(null);
    setAllJobsError(null);

    try {
      const resp = await axios.get('/candidate/jobs/me');
      setMyJobs(resp.data); // LevenshteinJobResponse[]
    } catch (err) {
      console.error(err);
      setMyJobsError('Failed to load my candidate-based jobs');
    }
  };


  const handleLoadAllJobs = async () => {
    setActiveMode('ALL');
    setSkillResults([]);
    setMyJobs([]);
    setSkillError(null);
    setMyJobsError(null);
  
    try {
      const resp = await axios.get('/candidate/jobs');
      //console.log('GET /candidate/jobs response:', resp.data);
      setAllJobs(resp.data); // List<DefaultJobResponse>
    } catch (err) {
      console.error(err);
      setAllJobsError('Failed to load all jobs');
    }
  };


  const handleApply = async (jobId) => {
    try {
      await axios.post('/candidate/applications', { jobId });
      alert('Applied successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to apply');
    }
  };


  const handleJobClick = (jobData) => {
    //console.log(jobData)
    // navigate to /candidate/candidate/jobs/:jobId 
    //console.log(jobData)
    navigate(`/candidate/jobs/${jobData.jobId}`);
  };

  return (
    <div style={styles.container}>
      <h2>Jobs</h2>

      {/* Skill Search */}
      <div style={styles.section}>
        <h3>Search by Skill</h3>
        <div style={styles.row}>
          <input
            type="text"
            placeholder="skill(s)..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSkillSearch} style={styles.button}>
            Search
          </button>
        </div>
        {skillLoading && <div>Searching...</div>}
        {skillError && <div style={{ color: 'red' }}>{skillError}</div>}

        {activeMode === 'SKILL' && skillResults.length > 0 && (
          <div style={styles.results}>
            <h4>Search Results</h4>
            {skillResults.map((levJob, idx) => {
              const jp = levJob.jobPost;
              return (
                <div
                  key={idx}
                  style={styles.jobCard}
                  onClick={() => handleJobClick(jp)}
                >
                  <p><b>Title:</b> {jp.jobTitle}</p>
                  <p><b>Company:</b> {jp.company?.name}</p>
                  <p><b>Match Rate (Searched Skill):</b> %{(levJob.matchRate * 100).toFixed(2)}</p>
                  <p><b>Experience Match:</b> {levJob.experienceMatches ? 'Yes' : 'No'}</p>
                  <button
                    style={styles.applyButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(jp.jobId);
                    }}
                  >
                    Apply
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <hr />

      {/* My Jobs */}
      <div style={styles.section}>
        <button onClick={handleLoadMyJobs} style={styles.button}>
          Recommend Me
        </button>
        {myJobsError && <div style={{ color: 'red' }}>{myJobsError}</div>}

        {activeMode === 'ME' && myJobs.length > 0 && (
          <div style={styles.results}>
            <h4>My Candidate-Based Jobs</h4>
            {myJobs.map((levJob, idx) => {
              const jp = levJob.jobPost;
              return (
                <div
                  key={idx}
                  style={styles.jobCard}
                  onClick={() => handleJobClick(jp)}
                >
                  <p><b>Title:</b> {jp.jobTitle}</p>
                  <p><b>Company:</b> {jp.company?.name}</p>
                  <p><b>Match Rate (Me):</b> %{(levJob.matchRate * 100).toFixed(2)}</p>
                  <p><b>Experience Match:</b> {levJob.experienceMatches ? 'Yes' : 'No'}</p>
                  <button
                    style={styles.applyButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(jp.jobId);
                    }}
                  >
                    Apply
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <hr />

      {/* Load All Jobs */}
      <div style={styles.section}>
        <button onClick={handleLoadAllJobs} style={styles.button}>
          Load All Jobs
        </button>
        {allJobsError && <div style={{ color: 'red' }}>{allJobsError}</div>}

        {activeMode === 'ALL' && allJobs.length > 0 && (
          <div style={styles.results}>
            <h4>All Jobs</h4>
            {allJobs.map((jobResp, idx) => {
              const jp = jobResp;
              return (
                <div
                  key={idx}
                  style={styles.jobCard}
                  onClick={() => handleJobClick(jp)}
                >
                  <p><b>Title:</b> {jp.jobTitle}</p>
                  <p><b>Company:</b> {jp.company?.name}</p>
                  <p><b>Skills:</b> {jp.requiredSkills}</p>
                  <p><b>Experienced:</b> {jp.experienced ? 'Yes' : 'No'}</p>
                  <button
                    style={styles.applyButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(jp.jobId);
                    }}
                  >
                    Apply
                  </button>
                </div>
              );
            })}
          </div>
        )}
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
  section: {
    marginBottom: '20px',
  },
  row: {
    display: 'flex',
    gap: '8px',
    marginBottom: '10px',
  },
  input: {
    padding: '6px',
    flex: '1',
  },
  button: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    padding: '6px 12px',
    cursor: 'pointer',
  },
  results: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '6px',
    marginTop: '10px',
  },
  jobCard: {
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '6px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  applyButton: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    marginTop: '8px',
    padding: '6px 10px',
    cursor: 'pointer',
  },
};

export default JobsViewCandidate;
