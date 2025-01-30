import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={styles.container}>
      <h1>Unauthorized access</h1>
      <p>You are not allowed to see this page.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
};

export default Unauthorized;
