import { Card } from 'react-bootstrap';

export default function Sidebar() {
  return (
    <Card className="h-100" style={{ minWidth: '220px' }}>
      <Card.Header className="bg-primary text-white fw-bold">Thông tin</Card.Header>
      <Card.Body>
        <Card.Text className="small text-muted">
          Hệ thống quản lý tin tức FU News. Dùng menu bên trái để điều hướng.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
