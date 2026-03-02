// Trang quản lý đặt phòng cho Staff
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Form, Table } from 'react-bootstrap';
import { handleApiError, staffAPI } from '../../services/api';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sorted = useMemo(() => {
    return [...bookings].sort((a, b) => (b.brId || 0) - (a.brId || 0));
  }, [bookings]);

  const load = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await staffAPI.getAllBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(handleApiError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    setError('');
    setLoading(true);
    try {
      await staffAPI.updateBookingStatus(id, status);
      await load();
    } catch (e) {
      setError(handleApiError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <Card className="card-custom">
        <Card.Header className="card-header-custom d-flex justify-content-between align-items-center">
          <div>Quản lý đặt phòng</div>
          <Button className="btn-secondary-custom" disabled={loading} onClick={load}>
            Tải lại
          </Button>
        </Card.Header>
        <Card.Body>
          {error && <Alert className="alert-danger-custom">{error}</Alert>}

          <Alert variant="info" className="alert-custom">
            Lưu ý: Backend đang JsonIgnore trường customer và chưa expose booking details, nên trang này hiện quản lý theo BookingReservation (ID, ngày đặt, tổng tiền, trạng thái).
          </Alert>

          <div className="table-responsive">
            <Table hover className="table-custom">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((b) => (
                  <tr key={b.brId}>
                    <td>{b.brId}</td>
                    <td>{b.bookingDate || ''}</td>
                    <td>{b.totalPrice ?? ''}</td>
                    <td>
                      <Form.Select
                        size="sm"
                        value={b.status || 'PENDING'}
                        disabled={loading}
                        onChange={(e) => updateStatus(b.brId, e.target.value)}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </Form.Select>
                    </td>
                  </tr>
                ))}
                {!loading && sorted.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookingManagement;
