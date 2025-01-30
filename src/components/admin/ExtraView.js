import React, { useState } from 'react';
import axios from '../../api/axios';

const ExtraView = () => {
  // CREATE HR form
  const [hrUserId, setHrUserId] = useState('');
  const [hrCompanyId, setHrCompanyId] = useState('');

  // CREATE COMPANY form
  const [companyName, setCompanyName] = useState('');

  
  const handleCreateHr = async (e) => {
    e.preventDefault();
    try {
      const reqBody = {
        userId: parseInt(hrUserId, 10),
        companyId: parseInt(hrCompanyId, 10),
      };
      await axios.post('/admin/hr', reqBody);
      alert('HR created successfully!');
      setHrUserId('');
      setHrCompanyId('');
    } catch (err) {
      console.error(err);
      alert('Failed to create HR');
    }
  };

  
  const handleCreateCompany = async (e) => {
    e.preventDefault();
    try {
      const reqBody = {
        name: companyName,
      };
      await axios.post('/admin/company', reqBody);
      alert('Company created successfully!');
      setCompanyName('');
    } catch (err) {
      console.error(err);
      alert('Failed to create company');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Extra Admin Functions</h2>

      <div style={styles.formBlock}>
        <h3>Create HR</h3>
        <form onSubmit={handleCreateHr} style={styles.form}>
          <label>User ID:</label>
          <input
            type="number"
            value={hrUserId}
            onChange={(e) => setHrUserId(e.target.value)}
            style={styles.input}
            required
          />

          <label>Company ID:</label>
          <input
            type="number"
            value={hrCompanyId}
            onChange={(e) => setHrCompanyId(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Create HR</button>
        </form>
      </div>

      <div style={styles.formBlock}>
        <h3>Create Company</h3>
        <form onSubmit={handleCreateCompany} style={styles.form}>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>Create Company</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
  },
  formBlock: {
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '6px',
    margin: '20px auto',
    maxWidth: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
    textAlign: 'left',
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    padding: '8px 16px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
};

export default ExtraView;
