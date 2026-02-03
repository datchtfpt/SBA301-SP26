import { Row, Col, Card } from 'react-bootstrap';
import { mockNews, mockCategories, mockAccounts } from '../data/mockData';

export default function Dashboard() {
  return (
    <div>
      <h1 className="mb-2">Dashboard</h1>
      <p className="text-muted mb-4">Tổng quan hệ thống quản lý tin tức</p>
      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card>
            <Card.Body className="text-center">
              <Card.Title as="h2" className="text-primary">
                {mockNews.length}
              </Card.Title>
              <Card.Text className="text-muted">Bài viết</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className="text-center">
              <Card.Title as="h2" className="text-primary">
                {mockCategories.length}
              </Card.Title>
              <Card.Text className="text-muted">Danh mục</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className="text-center">
              <Card.Title as="h2" className="text-primary">
                {mockAccounts.length}
              </Card.Title>
              <Card.Text className="text-muted">Tài khoản</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
