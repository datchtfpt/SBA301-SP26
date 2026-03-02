// Component Navbar với navigation tùy theo role
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout, isStaff, isCustomer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar expand="lg" className="navbar-custom">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
          Hotel Booking
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                {isStaff() && (
                  <>
                    <Nav.Link as={Link} to="/staff/dashboard">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/staff/customers">Quản lý khách hàng</Nav.Link>
                    <Nav.Link as={Link} to="/staff/rooms">Quản lý phòng</Nav.Link>
                    <Nav.Link as={Link} to="/staff/bookings">Quản lý đặt phòng</Nav.Link>
                  </>
                )}
                
                {isCustomer() && (
                  <>
                    <Nav.Link as={Link} to="/customer/dashboard">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/customer/booking/create">Đặt phòng</Nav.Link>
                    <Nav.Link as={Link} to="/customer/bookings">Lịch sử</Nav.Link>
                    <Nav.Link as={Link} to="/customer/profile">Hồ sơ</Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
          
          <Nav>
            {!isAuthenticated ? (
              <>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-light" 
                  className="me-2"
                >
                  Đăng nhập
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="light"
                >
                  Đăng ký
                </Button>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-light" id="user-dropdown">
                  {user?.email}
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                  <Dropdown.Header>
                    <div className="fw-bold">{user?.email}</div>
                    <small className="text-muted">
                      {isStaff() ? 'Nhân viên' : 'Khách hàng'}
                    </small>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  
                  {isCustomer() && (
                    <Dropdown.Item as={Link} to="/customer/profile">
                      Hồ sơ cá nhân
                    </Dropdown.Item>
                  )}
                  
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
