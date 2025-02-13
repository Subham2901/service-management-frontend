import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import Pages
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import MasterAgreementList from '../pages/MasterAgreementList';
import MasterAgreementDetails from '../pages/MasterAgreementDetails';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';
import ServiceRequestCreation from '../pages/ServiceRequestCreation';
import AdminDashboard from '../pages/AdminDashboard';
import UserManagement from '../pages/UserManagement';
import PMDashboard from '../pages/PMDashboard';
import PMMasterAgreementList from '../pages/PMMasterAgreementList';
import PMMasterAgreementDetails from '../pages/PMMasterAgreementDetails';
import PMServiceRequests from '../pages/PMServiceRequests';
import PMServiceRequestList from '../pages/PMServiceRequestList';
import PMServiceRequestDetails from '../pages/PMServiceRequestDetails';
import AssignedServiceRequests from '../pages/AssignedServiceRequests';
import AssignedServiceRequestDetails from '../pages/AssignedServiceRequestDetails';
import ApprovedServiceRequests from '../pages/ApprovedServiceRequests';
import ApprovedServiceRequestDetails from '../pages/ApprovedServiceRequestDetails';

import PMEvaluationSR from '../pages/PMEvaluationSR';

import PMEvaluationSRDetail from '../pages/PMEvaluationSRDetail';

// New User Pages
import UserServiceRequestList from '../pages/UserServiceRequestList';
import UserDraftServiceRequestList from '../pages/UserDraftServiceRequestList'; // Draft List Page
import DraftManagement from '../pages/DraftManagement'; // New Draft Management Page
import UserSubmittedServiceRequests from '../pages/UserSubmittedServiceRequests'; 
import UserSubmittedServiceRequestDetails from '../pages/UserSubmittedServiceRequestDetails';
import UserRejectedServiceRequestList from '../pages/UserRejectedServiceRequestList';
import ManageRejectedRequest from '../pages/ManageRejectedRequest';
import UserApprovedServiceRequests from '../pages/UserApprovedServiceRequests'; // Approved Requests List
import UserApprovedServiceRequestDetails from '../pages/UserApprovedServiceRequestDetails'; // Approved Request Details
import UserPMEvaluationServiceRequest from '../pages/UserPMEvaluationServiceRequest'; // PM Evaluation Service Request List
import UserPMEvaluationdetails from '../pages/UserPMEvaluationdetails'; // PM Evaluation Service Request Details


// Offer Related Pages
import ViewOffers from '../pages/offers/ViewOffers';
import ViewPMOffer from '../pages/offers/ViewPMOffer';
import UserPMvaluationoffer from '../pages/offers/UserPMevaluationoffer';


// 🔹 PM Orders Pages (New)
import PMOrders from '../pages/PMOrders';
import PMOrderDetails from '../pages/PMOrderDetails';

const AppRoutes: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isPM = user?.role === 'PM';

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <Navigate to="/home" />
            ) : isAdmin ? (
              <Navigate to="/admin/dashboard" />
            ) : isPM ? (
              <Navigate to="/pm/dashboard" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/home" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login />
            ) : isAdmin ? (
              <Navigate to="/admin/dashboard" />
            ) : isPM ? (
              <Navigate to="/pm/dashboard" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isLoggedIn ? (
              <Registration />
            ) : isAdmin ? (
              <Navigate to="/admin/dashboard" />
            ) : isPM ? (
              <Navigate to="/pm/dashboard" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/manage-users"
          element={isLoggedIn && isAdmin ? <UserManagement /> : <Navigate to="/login" />}
        />

        {/* PM Routes */}
        <Route
          path="/pm/dashboard"
          element={isLoggedIn && isPM ? <PMDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/pm-master-agreements"
          element={isLoggedIn && isPM ? <PMMasterAgreementList /> : <Navigate to="/login" />}
        />
        <Route
          path="/pm-master-agreements/:id"
          element={isLoggedIn && isPM ? <PMMasterAgreementDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/pm-service-requests"
          element={isLoggedIn && isPM ? <PMServiceRequests /> : <Navigate to="/login" />}
        />
        <Route
          path="/pm-service-request-list"
          element={isLoggedIn && isPM ? <PMServiceRequestList /> : <Navigate to="/login" />}
        />
        <Route
          path="/pm-service-requests/:id"
          element={isLoggedIn && isPM ? <PMServiceRequestDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/pm-assigned-requests"
          element={isLoggedIn && isPM ? <AssignedServiceRequests /> : <Navigate to="/login" />}
        />
        <Route
          path="/pm-assigned-requests/:id"
          element={isLoggedIn && isPM ? <AssignedServiceRequestDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/pm-approved-requests"
          element={isLoggedIn && isPM ? <ApprovedServiceRequests /> : <Navigate to="/login" />}
        />
        <Route
          path="/pm-approved-requests/:id"
          element={isLoggedIn && isPM ? <ApprovedServiceRequestDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/PM-Evaluation-SR"
          element={isLoggedIn && isPM ? <PMEvaluationSR /> : <Navigate to="/login" />}
        />
        <Route
          path="/PM-Evaluation-service-requests/:id"
          element={isLoggedIn && isPM ? <PMEvaluationSRDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/PM-Evaluation/:id/offers"
          element={isLoggedIn && !isAdmin && isPM ? <ViewPMOffer /> : <Navigate to="/login" />}
        />
         <Route path="/pm-orders" element={isLoggedIn && isPM ? <PMOrders /> : <Navigate to="/login" />} />
         <Route path="/pm-orders/:id" element={isLoggedIn && isPM ? <PMOrderDetails /> : <Navigate to="/login" />} />



        {/* User Routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn && !isAdmin && !isPM ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/master-agreements"
          element={isLoggedIn && !isAdmin && !isPM ? <MasterAgreementList /> : <Navigate to="/login" />}
        />
        <Route
          path="/master-agreements/:id"
          element={isLoggedIn && !isAdmin && !isPM ? <MasterAgreementDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-service-request"
          element={isLoggedIn && !isAdmin && !isPM ? <ServiceRequestCreation /> : <Navigate to="/login" />}
        />
        <Route
          path="/service-requests"
          element={isLoggedIn && !isAdmin && !isPM ? <UserServiceRequestList /> : <Navigate to="/login" />}
        />
        <Route
          path="/user-drafts"
          element={isLoggedIn && !isAdmin && !isPM ? <UserDraftServiceRequestList /> : <Navigate to="/login" />}
        />
        <Route
          path="/drafts/:id"
          element={isLoggedIn && !isAdmin && !isPM ? <DraftManagement /> : <Navigate to="/login" />}
        />
        <Route
          path="/user-submitted-requests" // New Route
          element={isLoggedIn && !isAdmin && !isPM ? <UserSubmittedServiceRequests /> : <Navigate to="/login" />}
        />
      <Route
        path="/submitted-requests/:id"
         element={isLoggedIn && !isAdmin && !isPM ? <UserSubmittedServiceRequestDetails /> : <Navigate to="/login" />}
        />
        <Route
        path="/user-rejected-requests"
        element={isLoggedIn && !isAdmin && !isPM ? <UserRejectedServiceRequestList /> : <Navigate to="/login" />}
        />
        <Route
          path="/rejected-requests/:id"
           element={isLoggedIn && !isAdmin && !isPM ? <ManageRejectedRequest /> : <Navigate to="/login" />}
        />
      <Route
          path="/user-approved-service-requests"
          element={isLoggedIn && !isAdmin && !isPM ? <UserApprovedServiceRequests /> : <Navigate to="/login" />}
            />
      <Route
         path="/user-approved-service-requests/:id"
        element={isLoggedIn && !isAdmin && !isPM ? <UserApprovedServiceRequestDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/service-requests/:id/offers"
          element={isLoggedIn && !isAdmin && !isPM ? <ViewOffers /> : <Navigate to="/login" />}
        />
              <Route
          path="/user-PMEvaluation-service-requests"
          element={isLoggedIn && !isAdmin && !isPM ? <UserPMEvaluationServiceRequest /> : <Navigate to="/login" />}
            />
      <Route
         path="/user-PMEvaluation-service-requests/:id"
        element={isLoggedIn && !isAdmin && !isPM ? <UserPMEvaluationdetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/user-PMEvaluation-service-requests/:id/useroffers"
          element={isLoggedIn && !isAdmin && !isPM ? <UserPMvaluationoffer/> : <Navigate to="/login" />}
        />
      </Routes>
      
    </Router>
  );
};

export default AppRoutes;
