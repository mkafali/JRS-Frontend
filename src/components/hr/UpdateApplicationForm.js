import React, { useState } from 'react';
import axios from '../../api/axios';

const UpdateApplicationForm = ({ application, onApplicationUpdated }) => {
  // application: { applicationId, candidateId, jobId, status, companyName }
  const [newStatus, setNewStatus] = useState(application.status || 'PENDING');
  const [error, setError] = useState(null);

  const handleUpdateApplication = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        status: newStatus
      };
      await axios.put(`/hr/applications/${application.applicationId}`, requestBody);
      if (onApplicationUpdated) {
        onApplicationUpdated();
      }
    } catch (err) {
      console.error('Update application failed:', err);
      setError('Failed to update application');
    }
  };

  return (
    <form onSubmit={handleUpdateApplication} style={styles.form}>
      <h4>Update Application (ID: {application.applicationId})</h4>
      {error && <p style={styles.error}>{error}</p>}
      <div>
        <label>Status</label><br/>
        <select 
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="PENDING">PENDING</option>
          <option value="REVIEWING">REVIEWING</option>
          <option value="REJECTED">REJECTED</option>
          <option value="ACCEPTED">ACCEPTED</option>
        </select>
      </div>
      <button type="submit">Update Application</button>
    </form>
  );
};

const styles = {
  form: {
    marginTop: '10px',
  },
  error: {
    color: 'red',
  },
};

export default UpdateApplicationForm;
