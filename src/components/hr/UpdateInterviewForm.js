import React, { useState } from 'react';
import axios from '../../api/axios';

const UpdateInterviewForm = ({ interview, onInterviewUpdated }) => {

  const [newStatus, setNewStatus] = useState(interview.status || 'SCHEDULED');
  const [error, setError] = useState(null);

  const handleUpdateInterview = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        status: newStatus
      };
      await axios.put(`/hr/interviews/${interview.interviewId}`, requestBody);
      if (onInterviewUpdated) {
        onInterviewUpdated();
      }
    } catch (err) {
      console.error('Update interview failed:', err);
      setError('Failed to update interview');
    }
  };

  return (
    <form onSubmit={handleUpdateInterview} style={styles.form}>
      <h4>Update Interview (ID: {interview.interviewId})</h4>
      {error && <p style={styles.error}>{error}</p>}
      <div>
        <label>Status</label><br/>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="PASSED">PASSED</option>
          <option value="FAILED">FAILED</option>
          <option value="CANCELED">CANCELED</option>
        </select>
      </div>
      <button type="submit">Update Interview</button>
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

export default UpdateInterviewForm;
