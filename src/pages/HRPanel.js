import React, { useState, useEffect, useContext } from 'react';
import JobsView from '../components/hr/JobsView';
import InterviewsView from '../components/hr/InterviewsView';
import ApplicationsView from '../components/hr/ApplicationsView';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../api/axios';
import { panelStyles } from '../styles/styles';

const HRPanel = () => {
  const { logout } = useContext(AuthContext);
  const styles = panelStyles;

  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('hrActiveTab');
    return saved || 'jobs';
  });

  useEffect(() => {
    localStorage.setItem('hrActiveTab', activeTab);
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2>HR Panel</h2>

        {isMobile ? (
          <div style={styles.dropdownContainer}>
            <button style={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
              ☰ Menu
            </button>
            {menuOpen && (
              <div style={styles.dropdownMenu}>
                <button style={activeTab === 'jobs' ? styles.activeBtn : styles.btn} onClick={() => { setActiveTab('jobs'); setMenuOpen(false); }}>Jobs</button>
                <button style={activeTab === 'interviews' ? styles.activeBtn : styles.btn} onClick={() => { setActiveTab('interviews'); setMenuOpen(false); }}>Interviews</button>
                <button style={activeTab === 'applications' ? styles.activeBtn : styles.btn} onClick={() => { setActiveTab('applications'); setMenuOpen(false); }}>Applications</button>
                <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div style={styles.navItems}>
            <button style={activeTab === 'jobs' ? styles.activeBtn : styles.btn} onClick={() => setActiveTab('jobs')}>Jobs</button>
            <button style={activeTab === 'interviews' ? styles.activeBtn : styles.btn} onClick={() => setActiveTab('interviews')}>Interviews</button>
            <button style={activeTab === 'applications' ? styles.activeBtn : styles.btn} onClick={() => setActiveTab('applications')}>Applications</button>
            <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <div style={styles.content}>
        {activeTab === 'jobs' && <JobsView />}
        {activeTab === 'interviews' && <InterviewsView />}
        {activeTab === 'applications' && <ApplicationsView />}
      </div>
    </div>
  );
};

export default HRPanel;
