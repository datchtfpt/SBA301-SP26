// Component chính của ứng dụng với routing và theme
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import StaffDashboard from './pages/staff/StaffDashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerManagement from './pages/staff/CustomerManagement';
import RoomManagement from './pages/staff/RoomManagement';
import BookingManagement from './pages/staff/BookingManagement';
import CustomerProfile from './pages/customer/CustomerProfile';
import BookingHistory from './pages/customer/BookingHistory';
import CreateBooking from './pages/customer/CreateBooking';

// Context cho authentication
import { AuthProvider } from './contexts/AuthContext';

// Loading component
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border spinner-custom" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Container fluid className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Staff routes */}
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/staff/customers" element={<CustomerManagement />} />
              <Route path="/staff/rooms" element={<RoomManagement />} />
              <Route path="/staff/bookings" element={<BookingManagement />} />
              
              {/* Customer routes */}
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/customer/bookings" element={<BookingHistory />} />
              <Route path="/customer/booking/create" element={<CreateBooking />} />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
