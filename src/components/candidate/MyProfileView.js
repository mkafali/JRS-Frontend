import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const MyProfileView = () => {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [resumeText, setResumeText] = useState('');
  const [skills, setSkills] = useState('');
  const [experienced, setExperienced] = useState(false);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const resp = await axios.get('/candidate/me');
        setCandidate(resp.data);
        
        setEmail(resp.data.email);
        setFirstName(resp.data.firstName);
        setLastName(resp.data.lastName);
        setResumeText(resp.data.resumeText || '');
        setSkills(resp.data.skills || '');
        setExperienced(resp.data.experienced || false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch candidate info');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, []);

  // PUT /candidate/me
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email,
        firstName,
        lastName,
      };
      await axios.put('/candidate/me', body);
      alert('Profile updated!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  // PUT /candidate/cv
  const handleUpdateCV = async (e) => {
    e.preventDefault();
    try {
      const body = {
        resumeText,
        skills,
        experienced,
      };
      await axios.put('/candidate/cv', body);
      alert('CV updated!');
    } catch (err) {
      console.error(err);
      alert('Failed to update CV');
    }
  };

  if (loading) return <div>Loading candidate profile...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!candidate) return <div>No candidate data</div>;

  return (
    <div style={styles.container}>
      <h2>My Profile</h2>

      {/* Basic Info Update */}
      <form onSubmit={handleUpdateProfile} style={styles.form}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={styles.input}
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Update Profile</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      {/* CV Update */}
      <form onSubmit={handleUpdateCV} style={styles.form}>
        <label>Resume Text:</label>
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows="4"
          style={styles.textarea}
        />

        <label>Skills:</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          style={styles.input}
        />

        <label>
          <input
            type="checkbox"
            checked={experienced}
            onChange={(e) => setExperienced(e.target.checked)}
          />
          Experienced?
        </label>

        <button type="submit" style={styles.button}>Update CV</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '600px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    padding: '12px',
    borderRadius: '6px',
  },
  input: {
    padding: '8px',
  },
  textarea: {
    padding: '8px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#6a89cc',
    border : "none",
    color :  "white",
    width: '120px',
    padding: '8px',
    cursor: 'pointer'
  },
};

export default MyProfileView;
