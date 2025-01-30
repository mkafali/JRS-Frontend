import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';

// === HR ===
import InterviewDetail from './components/hr/InterviewDetail';
import ApplicationDetail from './components/hr/ApplicationDetail';
import JobDetail from './components/hr/JobDetail';

// === Admin ===
import JobDetailAdmin from './components/admin/JobDetail';
import CandidateDetail from './components/admin/CandidateDetail';
import ApplicationDetailAdmin from './components/admin/ApplicationDetailAdmin';
import InterviewDetailAdmin from './components/admin/InterviewDetailAdmin';

// === Candidate === 
import ApplicationDetailCandidate from './components/candidate/ApplicationDetailCandidate';
import InterviewDetailCandidate from './components/candidate/InterviewDetailCandidate';
import JobDetailCandidate from './components/candidate/JobDetailCandidate';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* === Public Routes === */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* === Protected Dashboard (everyone who is logged in) === */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* === HR Detail Pages === */}
          <Route
            path="/hr/interviews/:interviewId"
            element={
              <ProtectedRoute requiredRole="HR">
                <InterviewDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr/applications/:applicationId"
            element={
              <ProtectedRoute requiredRole="HR">
                <ApplicationDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr/jobs/:jobId"
            element={
              <ProtectedRoute requiredRole="HR">
                <JobDetail />
              </ProtectedRoute>
            }
          />

          {/* === Admin Detail Pages === */}
          <Route
            path="/admin/jobs/:jobId"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <JobDetailAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications/:applicationId"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <ApplicationDetailAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/interviews/:interviewId"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <InterviewDetailAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/candidates/:candidateId"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <CandidateDetail />
              </ProtectedRoute>
            }
          />

          {/* === Candidate Detail Pages === */}
          <Route
            path="/candidate/applications/:applicationId"
            element={
              <ProtectedRoute requiredRole="CANDIDATE">
                <ApplicationDetailCandidate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/candidate/interviews/:interviewId"
            element={
              <ProtectedRoute requiredRole="CANDIDATE">
                <InterviewDetailCandidate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/candidate/jobs/:jobId"
            element={
              <ProtectedRoute requiredRole="CANDIDATE">
                <JobDetailCandidate />
              </ProtectedRoute>
            }
          />

          {/* === Unauthorized === */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* === Fallback === */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
