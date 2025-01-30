import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../api/axios';

import CandidatesView from '../components/admin/CandidatesView';
import JobsView from '../components/admin/JobsView';
import ApplicationsView from '../components/admin/ApplicationsView';
import InterviewsViewAdmin from '../components/admin/InterviewsViewAdmin';
import ExtraView from '../components/admin/ExtraView';
import { panelStyles } from '../styles/styles';

const AdminPanel = () => {
  const { logout } = useContext(AuthContext);
  const styles = panelStyles;

  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('adminActiveTab');
    return savedTab || 'candidates';
  });

  useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Responsive
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
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>Admin Panel</h2>

        {isMobile ? (
          // Mobilde dropdown menu
          <div style={styles.dropdownContainer}>
            <button style={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
              ☰ Menu
            </button>
            {menuOpen && (
              <div style={styles.dropdownMenu}>
                <button
                  style={activeTab === 'candidates' ? styles.activeBtn : styles.btn}
                  onClick={() => {
                    setActiveTab('candidates');
                    setMenuOpen(false);
                  }}
                >
                  Candidates
                </button>
                <button
                  style={activeTab === 'jobs' ? styles.activeBtn : styles.btn}
                  onClick={() => {
                    setActiveTab('jobs');
                    setMenuOpen(false);
                  }}
                >
                  Jobs
                </button>
                <button
                  style={activeTab === 'applications' ? styles.activeBtn : styles.btn}
                  onClick={() => {
                    setActiveTab('applications');
                    setMenuOpen(false);
                  }}
                >
                  Applications
                </button>
                <button
                  style={activeTab === 'interviews' ? styles.activeBtn : styles.btn}
                  onClick={() => {
                    setActiveTab('interviews');
                    setMenuOpen(false);
                  }}
                >
                  Interviews
                </button>
                <button
                  style={activeTab === 'extra' ? styles.activeBtn : styles.btn}
                  onClick={() => {
                    setActiveTab('extra');
                    setMenuOpen(false);
                  }}
                >
                  HR/Company
                </button>
                <button style={styles.logoutBtn} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          
          <div style={styles.navItems}>
            <button
              style={activeTab === 'candidates' ? styles.activeBtn : styles.btn}
              onClick={() => setActiveTab('candidates')}
            >
              Candidates
            </button>
            <button
              style={activeTab === 'jobs' ? styles.activeBtn : styles.btn}
              onClick={() => setActiveTab('jobs')}
            >
              Jobs
            </button>
            <button
              style={activeTab === 'applications' ? styles.activeBtn : styles.btn}
              onClick={() => setActiveTab('applications')}
            >
              Applications
            </button>
            <button
              style={activeTab === 'interviews' ? styles.activeBtn : styles.btn}
              onClick={() => setActiveTab('interviews')}
            >
              Interviews
            </button>
            <button
              style={activeTab === 'extra' ? styles.activeBtn : styles.btn}
              onClick={() => setActiveTab('extra')}
            >
              HR/Company
            </button>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {activeTab === 'candidates' && <CandidatesView />}
        {activeTab === 'jobs' && <JobsView />}
        {activeTab === 'applications' && <ApplicationsView />}
        {activeTab === 'interviews' && <InterviewsViewAdmin />}
        {activeTab === 'extra' && <ExtraView />}
      </div>
    </div>
  );
};

export default AdminPanel;

