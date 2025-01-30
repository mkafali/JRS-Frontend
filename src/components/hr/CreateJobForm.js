import React, { useState } from 'react';
import axios from '../../api/axios';

const CreateJobForm = ({ onJobCreated }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [experienced, setExperienced] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const request = {
        jobTitle,
        jobDescription,
        requiredSkills,
        experienced
      };
      await axios.post('/hr/jobs', request);
      
      alert('Job created successfully!');

      if (onJobCreated) onJobCreated();

      setJobTitle('');
      setJobDescription('');
      setRequiredSkills('');
      setExperienced(false);
    } catch (err) {
      console.error(err);
      setError('Create job failed');
    }
  };

  return (
    <form onSubmit={handleCreateJob} style={styles.form}>
      <h4>Create New Job</h4>
      {error && <div style={{color:'red'}}>{error}</div>}

      <div>
        <label>Job Title</label><br/>
        <input 
          type="text" 
          value={jobTitle} 
          onChange={(e) => setJobTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Description</label><br/>
        <textarea 
          value={jobDescription} 
          onChange={(e) => setJobDescription(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Required Skills</label><br/>
        <input 
          type="text" 
          value={requiredSkills} 
          onChange={(e) => setRequiredSkills(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Experienced?</label>
        <input 
          type="checkbox" 
          checked={experienced} 
          onChange={(e) => setExperienced(e.target.checked)} 
        />
      </div>

      <button type="submit" style={styles.button}>Create</button>
    </form>
  );
};

const styles = {
  form: {
    border: '1px solid #ccc',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    padding: '8px 16px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginTop : "10px"
  },
  
};

export default CreateJobForm;
