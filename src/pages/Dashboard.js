import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AdminPanel from './AdminPanel';
import CandidatePanel from './CandidatePanel';
import HRPanel from './HRPanel';
import Unauthorized from './Unauthorized';

const Dashboard = () => {
  const { role } = useContext(AuthContext);

  if (!role) {
    return <Unauthorized />;
  }

  return (
    <div style={{ height: '100vh' }}>
      {role === 'ADMIN' && <AdminPanel />}
      {role === 'CANDIDATE' && <CandidatePanel />}
      {role === 'HR' && <HRPanel />}
    </div>
  );
};

export default Dashboard;
