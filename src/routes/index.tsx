import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import MasterAgreementList from '../pages/MasterAgreementList';
import MasterAgreementDetails from '../pages/MasterAgreementDetails';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';
import ServiceRequestCreation from '../pages/ServiceRequestCreation'; // Import the new page

const AppRoutes: React.FC = () => {
    const { isLoggedIn } = useAuth();

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<LandingPage />} />
                <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/register" element={!isLoggedIn ? <Registration /> : <Navigate to="/dashboard" />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/master-agreements" element={isLoggedIn ? <MasterAgreementList /> : <Navigate to="/login" />} />
                <Route path="/master-agreements/:id" element={isLoggedIn ? <MasterAgreementDetails /> : <Navigate to="/login" />} />
                <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/create-service-request" element={isLoggedIn ? <ServiceRequestCreation /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
