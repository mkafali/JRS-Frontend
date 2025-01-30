import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const JobsView = () => {
  const navigate = useNavigate();

  // Candidate Dropdown
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState('');

  // '' (none), 'SKILL', 'CANDIDATE', 'ALL'
  const [activeMode, setActiveMode] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const resp = await axios.get('/admin/candidates');
        setCandidates(resp.data);
      } catch (err) {
        console.error('Failed to fetch candidates for dropdown', err);
      }
    };
    fetchCandidates();
  }, []);


  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      alert('Please enter skill(s) to search');
      return;
    }
    setActiveMode('SKILL');
    setCandidateSearchResults([]);
    setAllJobs([]);
    setCandidateSearchError(null);
    setJobsError(null);

    setSearchLoading(true);
    setSearchError(null);

    try {
      const response = await axios.get(`/admin/jobs/${searchInput}`);
      setSearchResults(response.data);
    } catch (err) {
      console.error(err);
      setSearchError('Search by skill failed');
    } finally {
      setSearchLoading(false);
    }
  };

  const [candidateSearchResults, setCandidateSearchResults] = useState([]);
  const [candidateSearchError, setCandidateSearchError] = useState(null);

  const handleFindJobsForCandidate = async () => {
    if (!selectedCandidateId) {
      alert('Please select a candidate first');
      return;
    }
    setActiveMode('CANDIDATE');
    setSearchResults([]);
    setAllJobs([]);
    setSearchError(null);
    setJobsError(null);

    try {
      const resp = await axios.get(`/admin/jobs/candidate?candidateId=${selectedCandidateId}`);
      setCandidateSearchResults(resp.data);
    } catch (err) {
      console.error(err);
      setCandidateSearchError('Failed to get jobs for candidate');
    }
  };

  const [allJobs, setAllJobs] = useState([]);
  const [jobsError, setJobsError] = useState(null);

  const handleLoadAllJobs = async () => {
    setActiveMode('ALL');
    setSearchResults([]);
    setCandidateSearchResults([]);
    setSearchError(null);
    setCandidateSearchError(null);

    try {
      const response = await axios.get('/admin/jobs');
      setAllJobs(response.data); // List<DefaultJobResponse>
    } catch (err) {
      console.error(err);
      setJobsError('Failed to load all jobs');
    }
  };


  const handleSuggest = async (jobId) => {
    if (!selectedCandidateId) {
      alert('Please select a candidate first');
      return;
    }
    try {
      await axios.post(`/admin/suggestions/${selectedCandidateId}/${jobId}`);
      alert('Suggested successfully!');
    } catch (err) {
      console.error(err);
      alert('Suggest failed');
    }
  };

  const handleJobCardClick = (jobData) => {
    navigate(`/admin/jobs/${jobData.jobId}`);
  };

  return (
    <div style={styles.container}>
      <h2>Jobs</h2>

      {/* 1) CANDIDATE DROPDOWN */}
      <div style={styles.section}>
        <label><b>Select Candidate:</b></label>
        <select
          value={selectedCandidateId}
          onChange={(e) => setSelectedCandidateId(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Select Candidate --</option>
          {candidates.map((cand) => (
            <option key={cand.candidateId} value={cand.candidateId}>
              {cand.firstName} {cand.lastName} (Candidate: {cand.candidateId})
            </option>
          ))}
        </select>
      </div>

      <hr style={styles.hr} />

      {/* 2) SEARCH BY SKILL */}
      <div style={styles.section}>
        <h3>Search Jobs by Skill</h3>
        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder="Search by skills..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>
            Search
          </button>
        </div>
        {searchLoading && <div>Searching...</div>}
        {searchError && <div style={{ color: 'red' }}>{searchError}</div>}

        {activeMode === 'SKILL' && searchResults.length > 0 && (
          <div style={styles.subSection}>
            <h4>Search Results</h4>
            {searchResults.map((levJob, idx) => {
              const jp = levJob.jobPost;
              return (
                <div
                  key={idx}
                  style={styles.jobCard}
                  onClick={() => handleJobCardClick(jp)}
                >
                  <p><b>Title:</b> {jp.jobTitle}</p>
                  <p><b>Company:</b> {jp.company?.name}</p>
                  <p><b>Match Rate (Searched skill):</b> %{(levJob.matchRate * 100).toFixed(2)}</p>
                  <button style={styles.suggestButton} onClick={(e) => {
                    e.stopPropagation();
                    handleSuggest(jp.jobId);
                  }}>
                    Suggest
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <hr style={styles.hr} />

      {/* 3) FIND JOBS FOR CANDIDATE (using selectedCandidateId) */}
      <div style={styles.section}>
        <h3>Find Jobs for Selected Candidate</h3>
        <button onClick={handleFindJobsForCandidate} style={styles.button}>
          Find Jobs
        </button>

        {candidateSearchError && <div style={{ color: 'red' }}>{candidateSearchError}</div>}

        {activeMode === 'CANDIDATE' && candidateSearchResults.length > 0 && (
          <div style={styles.subSection}>
            <h4>Candidate Search Results (Candidate ID: {selectedCandidateId})</h4>
            {candidateSearchResults.map((levJob, idx) => {
              const jp = levJob.jobPost;
              return (
                <div
                  key={idx}
                  style={styles.jobCard}
                  onClick={() => handleJobCardClick(jp)}
                >
                  <p><b>Title:</b> {jp.jobTitle}</p>
                  <p><b>Company:</b> {jp.company?.name}</p>
                  <p><b>Match Rate (Candidate):</b> %{(levJob.matchRate * 100).toFixed(2)}</p>
                  <p><b>Experience Match:</b> {levJob.experienceMatches ? 'Yes' : 'No'}</p>
                  <button style={styles.suggestButton} onClick={(e) => {
                    e.stopPropagation();
                    handleSuggest(jp.jobId);
                  }}>
                    Suggest
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <hr style={styles.hr} />

      {/* 4) LOAD ALL JOBS */}
      
        <button onClick={handleLoadAllJobs} style={styles.button}>
          Load All Jobs
        </button>
      
      {jobsError && <div style={{ color: 'red' }}>{jobsError}</div>}

      {activeMode === 'ALL' && allJobs.length > 0 && (
        <div style={styles.section}>
          <h3>All Jobs</h3>
          {allJobs.map((jobResp, idx) => {
            //console.log(jobResp)
            const jp = jobResp;
            return (
              <div
                key={idx}
                style={styles.jobCard}
                onClick={() => handleJobCardClick(jp)}
              >
                <p><b>Title:</b> {jp.jobTitle}</p>
                <p><b>Company:</b> {jp.company?.name}</p>
                <p><b>Skills:</b> {jp.requiredSkills}</p>
                <p><b>Experienced:</b> {jp.experienced ? 'Yes' : 'No'}</p>
                <button
                  style={styles.suggestButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSuggest(jp.jobId);
                  }}
                >
                  Suggest
                </button>
              </div>
            );
          })}
        </div>
      )}
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
  subSection: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '6px',
    marginTop: '10px',
  },
  searchRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '10px',
  },
  input: {
    padding: '5px',
    flex: '1',
  },
  button: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    padding: '6px 10px',
    cursor: 'pointer',
  },
  select: {
    marginLeft: '6px',
    padding: '4px',
  },
  hr: {
    margin: '20px 0',
  },
  jobCard: {
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '6px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  suggestButton: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    marginTop: '10px',
    padding: '4px 8px',
    cursor: 'pointer',
  },
};

export default JobsView;
