import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivacyPolicy from './components/Privacy_policy';
import TermsOfService from './components/Terms_of_service';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/Privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;