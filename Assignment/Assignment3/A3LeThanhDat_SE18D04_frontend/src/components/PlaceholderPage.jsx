// Component placeholder cho các trang chưa hoàn thiện
import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const PlaceholderPage = ({ title, description, icon }) => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="card-custom text-center p-5">
            <Card.Body>
              <div className="display-1 mb-4">{icon}</div>
              <h2 className="text-primary mb-3">{title}</h2>
              <p className="text-muted">{description}</p>
              <div className="alert alert-info">
                <strong>🚧 Đang phát triển</strong><br />
                Tính năng này đang được xây dựng và sẽ sớm có sẵn.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceholderPage;
