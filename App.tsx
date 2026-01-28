import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-x-hidden bg-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </main>
  );
}

export default App;