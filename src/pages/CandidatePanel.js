import React, { useState, useEffect, useContext } from 'react';
import MyProfileView from '../components/candidate/MyProfileView';
import JobsViewCandidate from '../components/candidate/JobsViewCandidate';
import ApplicationsViewCandidate from '../components/candidate/ApplicationsViewCandidate';
import InterviewsViewCandidate from '../components/candidate/InterviewsViewCandidate';
import SuggestionsViewCandidate from '../components/candidate/SuggestionsViewCandidate';
import { AuthContext } from '../contexts/AuthContext';
import axios from '../api/axios';
import { panelStyles } from '../styles/styles';

const CandidatePanel = () => {
  const { logout } = useContext(AuthContext);
  const styles = panelStyles;

  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('candidateActiveTab');
    return saved || 'profile';
  });

  useEffect(() => {
    localStorage.setItem('candidateActiveTab', activeTab);
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
        <h2>Candidate Panel</h2>

        {isMobile ? (
          <div style={styles.dropdownContainer}>
            <button style={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
              ☰ Menu
            </button>
            {menuOpen && (
              <div style={styles.dropdownMenu}>
                <button style={activeTab === 'profile' ? styles.activeBtn : styles.btn} onClick={() => { setActiveTab('profile'); setMenuOpen(false); }}>Profile</button>
                <button style={activeTab === 'jobs' ? styles.activeBtn : styles.btn} onClick={() => { setActiveTab('jobs'); setMenuOpen(false); }}>Jobs</button>
                <button style={activeTab === 'applications' ? styles.activeBtn : styles.btn} onClick={() => { setActiveTab('applications'); setMenuOpen(false); }}>Applications</button>
                <button style={activeTab === 'interviews' ? styles.activeBtn : styles.btn} onClick={() => { setActiveTab('interviews'); setMenuOpen(false); }}>Interviews</button>
                <button style={activeTab === 'suggestions' ? styles.activeBtn : styles.btn} onClick={() => { setActiveTab('suggestions'); setMenuOpen(false); }}>Suggestions</button>
                <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div style={styles.navItems}>
            <button style={activeTab === 'profile' ? styles.activeBtn : styles.btn} onClick={() => setActiveTab('profile')}>Profile</button>
            <button style={activeTab === 'jobs' ? styles.activeBtn : styles.btn} onClick={() => setActiveTab('jobs')}>Jobs</button>
            <button style={activeTab === 'applications' ? styles.activeBtn : styles.btn} onClick={() => setActiveTab('applications')}>Applications</button>
            <button style={activeTab === 'interviews' ? styles.activeBtn : styles.btn} onClick={() => setActiveTab('interviews')}>Interviews</button>
            <button style={activeTab === 'suggestions' ? styles.activeBtn : styles.btn} onClick={() => setActiveTab('suggestions')}>Suggestions</button>
            <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <div style={styles.content}>
        {activeTab === 'profile' && <MyProfileView />}
        {activeTab === 'jobs' && <JobsViewCandidate />}
        {activeTab === 'applications' && <ApplicationsViewCandidate />}
        {activeTab === 'interviews' && <InterviewsViewCandidate />}
        {activeTab === 'suggestions' && <SuggestionsViewCandidate />}
      </div>
    </div>
  );
};

export default CandidatePanel;
