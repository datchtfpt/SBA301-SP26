// Dashboard cho Customer với các chức năng đặt phòng và quản lý hồ sơ
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CustomerDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    totalSpent: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data - trong thực tế sẽ gọi API
      setTimeout(() => {
        setStats({
          totalBookings: 12,
          activeBookings: 2,
          completedBookings: 10,
          totalSpent: 15000000
        });
        
        setRecentBookings([
          {
            id: 1,
            roomNumber: '101',
            checkIn: '2024-01-15',
            checkOut: '2024-01-18',
            status: 'ACTIVE',
            totalAmount: 1500000
          },
          {
            id: 2,
            roomNumber: '205',
            checkIn: '2024-02-01',
            checkOut: '2024-02-03',
            status: 'COMPLETED',
            totalAmount: 1000000
          }
        ]);
        
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      setError('Không thể tải dữ liệu');
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'ACTIVE': { color: 'success', text: 'Đang hoạt động' },
      'COMPLETED': { color: 'primary', text: 'Hoàn thành' },
      'CANCELLED': { color: 'danger', text: 'Đã hủy' },
      'PENDING': { color: 'warning', text: 'Chờ xác nhận' }
    };
    
    const config = statusConfig[status] || { color: 'secondary', text: status };
    return <span className={`badge bg-${config.color}`}>{config.text}</span>;
  };

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
            <h1 className="dashboard-title">🏨 Dashboard Khách hàng</h1>
            <p className="text-muted mb-0">Chào mừng, {user?.email}</p>
          </div>
          <div>
            <span className="badge bg-info fs-6">Customer</span>
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
              title="Tổng đặt phòng"
              value={stats.totalBookings}
              icon="📋"
              color="text-info"
              link="/customer/bookings"
            />
          </Col>
          <Col md={6} lg={3}>
            <StatCard
              title="Đang hoạt động"
              value={stats.activeBookings}
              icon="✅"
              color="text-success"
              link="/customer/bookings"
            />
          </Col>
          <Col md={6} lg={3}>
            <StatCard
              title="Đã hoàn thành"
              value={stats.completedBookings}
              icon="🎉"
              color="text-primary"
              link="/customer/bookings"
            />
          </Col>
          <Col md={6} lg={3}>
            <StatCard
              title="Tổng chi tiêu"
              value={formatCurrency(stats.totalSpent)}
              icon="💰"
              color="text-warning"
              link="/customer/bookings"
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
                  onClick={() => navigate('/customer/booking/create')}
                >
                  🏠 Đặt phòng mới
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  variant="primary"
                  className="btn-primary-custom w-100"
                  onClick={() => navigate('/customer/bookings')}
                >
                  📋 Xem lịch sử
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  variant="primary"
                  className="btn-primary-custom w-100"
                  onClick={() => navigate('/customer/profile')}
                >
                  👤 Cập nhật hồ sơ
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  variant="secondary"
                  className="btn-secondary-custom w-100"
                  onClick={fetchDashboardData}
                >
                  🔄 Làm mới dữ liệu
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Recent Bookings */}
        <Card className="card-custom mt-4">
          <Card.Header className="card-header-custom d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📅 Đặt phòng gần đây</h5>
            <Button 
              variant="outline-light" 
              size="sm"
              onClick={() => navigate('/customer/bookings')}
            >
              Xem tất cả
            </Button>
          </Card.Header>
          <Card.Body>
            {recentBookings.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Phòng</th>
                      <th>Ngày nhận</th>
                      <th>Ngày trả</th>
                      <th>Trạng thái</th>
                      <th>Tổng tiền</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>
                          <strong>{booking.roomNumber}</strong>
                        </td>
                        <td>{formatDate(booking.checkIn)}</td>
                        <td>{formatDate(booking.checkOut)}</td>
                        <td>{getStatusBadge(booking.status)}</td>
                        <td>{formatCurrency(booking.totalAmount)}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => navigate(`/customer/bookings/${booking.id}`)}
                          >
                            Chi tiết
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted mb-3">Bạn chưa có đặt phòng nào</p>
                <Button
                  variant="primary"
                  className="btn-primary-custom"
                  onClick={() => navigate('/customer/booking/create')}
                >
                  🏠 Đặt phòng ngay
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Welcome Message */}
        <Card className="card-custom mt-4 border-info">
          <Card.Body className="text-center">
            <h5 className="text-info mb-3">🎉 Chào mừng đến với Hotel Booking System!</h5>
            <p className="text-muted mb-0">
              Khám phá các phòng nghỉ sang trọng và trải nghiệm dịch vụ đẳng cấp của chúng tôi.
              Đặt phòng ngay hôm nay để nhận ưu đãi đặc biệt!
            </p>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default CustomerDashboard;
