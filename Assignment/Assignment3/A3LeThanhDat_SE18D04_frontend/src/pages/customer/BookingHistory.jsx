// Trang lịch sử đặt phòng của khách hàng
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Table } from 'react-bootstrap';
import { customerAPI, handleApiError } from '../../services/api';

const BookingHistory = () => {
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
      const data = await customerAPI.getBookings();
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

  const cancel = async (id) => {
    if (!window.confirm('Hủy đặt phòng này?')) return;
    setError('');
    setLoading(true);
    try {
      await customerAPI.cancelBooking(id);
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
          <div>Lịch sử đặt phòng</div>
          <Button className="btn-secondary-custom" disabled={loading} onClick={load}>
            Tải lại
          </Button>
        </Card.Header>
        <Card.Body>
          {error && <Alert className="alert-danger-custom">{error}</Alert>}

          <div className="table-responsive">
            <Table hover className="table-custom">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th style={{ width: 160 }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((b) => (
                  <tr key={b.brId}>
                    <td>{b.brId}</td>
                    <td>{b.bookingDate || ''}</td>
                    <td>{b.totalPrice ?? ''}</td>
                    <td>{b.status || ''}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        disabled={loading || b.status === 'CANCELLED' || b.status === 'COMPLETED'}
                        onClick={() => cancel(b.brId)}
                      >
                        Hủy
                      </Button>
                    </td>
                  </tr>
                ))}

                {!loading && sorted.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-4">
                      Chưa có đặt phòng nào
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

export default BookingHistory;
