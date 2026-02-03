import { Card } from 'react-bootstrap';

export default function Settings() {
  return (
    <div>
      <h1 className="mb-2">Settings</h1>
      <Card>
        <Card.Body>
          <Card.Text className="text-muted">
            Cấu hình hệ thống (trang placeholder, sẽ mở rộng sau)
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
