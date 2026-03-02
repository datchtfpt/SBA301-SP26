// Dashboard cho Staff với các chức năng quản lý
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const StaffDashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalRooms: 0,
    totalBookings: 0,
    activeBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch dashboard statistics
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Mock data - trong thực tế sẽ gọi API
      setTimeout(() => {
        setStats({
          totalCustomers: 150,
          totalRooms: 50,
          totalBookings: 320,
          activeBookings: 28
        });
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      setError('Không thể tải dữ liệu thống kê');
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, link }) => (
    <Card className="card-custom h-100 cursor-pointer" onClick={() => navigate(link)}>
      <Card.Body className="text-center">
        <div className={`display-4 mb-3 ${color}`}>{icon}</div>
        <h5 className="card-title text-muted">{title}</h5>
        <h2 className="fw-bold text-primary">{value}</h2>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border spinner-custom" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Đang tải dữ liệu...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      <div className="dashboard-card fade-in">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="dashboard-title">👨‍💼 Dashboard Nhân viên</h1>
            <p className="text-muted mb-0">Chào mừng trở lại, {user?.email}</p>
          </div>
          <div>
            <span className="badge bg-success fs-6">Staff</span>
          </div>
        </div>

        {error && (
          <Alert variant="danger" className="alert-danger-custom">
            {error}
          </Alert>
        )}

        {/* Statistics Cards */}
        <Row className="g-4 mb-4">
          <Col md={6} lg={3}>
            <StatCard
              title="Tổng khách hàng"
              value={stats.totalCustomers}
              icon="👥"
              color="text-info"
              link="/staff/customers"
            />
          </Col>
          <Col md={6} lg={3}>
            <StatCard
              title="Tổng phòng"
              value={stats.totalRooms}
              icon="🏠"
              color="text-warning"
              link="/staff/rooms"
            />
          </Col>
          <Col md={6} lg={3}>
            <StatCard
              title="Tổng đặt phòng"
              value={stats.totalBookings}
              icon="📋"
              color="text-success"
              link="/staff/bookings"
            />
          </Col>
          <Col md={6} lg={3}>
            <StatCard
              title="Đang hoạt động"
              value={stats.activeBookings}
              icon="✅"
              color="text-primary"
              link="/staff/bookings"
            />
          </Col>
        </Row>

        {/* Quick Actions */}
        <Card className="card-custom">
          <Card.Header className="card-header-custom">
            <h5 className="mb-0">⚡ Hành động nhanh</h5>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col md={3}>
                <Button
                  variant="primary"
                  className="btn-primary-custom w-100"
                  onClick={() => navigate('/staff/customers')}
                >
                  👥 Quản lý khách hàng
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  variant="primary"
                  className="btn-primary-custom w-100"
                  onClick={() => navigate('/staff/rooms')}
                >
                  🏠 Quản lý phòng
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  variant="primary"
                  className="btn-primary-custom w-100"
                  onClick={() => navigate('/staff/bookings')}
                >
                  📋 Quản lý đặt phòng
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  variant="secondary"
                  className="btn-secondary-custom w-100"
                  onClick={fetchDashboardStats}
                >
                  🔄 Làm mới dữ liệu
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Recent Activity */}
        <Card className="card-custom mt-4">
          <Card.Header className="card-header-custom">
            <h5 className="mb-0">📊 Hoạt động gần đây</h5>
          </Card.Header>
          <Card.Body>
            <div className="activity-list">
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <div>
                  <strong>Khách hàng mới:</strong> Nguyễn Văn A
                  <div className="text-muted small">Vừa đăng ký tài khoản</div>
                </div>
                <small className="text-muted">5 phút trước</small>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <div>
                  <strong>Đặt phòng mới:</strong> Phòng 101
                  <div className="text-muted small">Khách hàng Trần Thị B</div>
                </div>
                <small className="text-muted">15 phút trước</small>
              </div>
              <div className="d-flex justify-content-between align-items-center py-2">
                <div>
                  <strong>Cập nhật phòng:</strong> Phòng 201
                  <div className="text-muted small">Thay đổi trạng thái</div>
                </div>
                <small className="text-muted">1 giờ trước</small>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default StaffDashboard;
