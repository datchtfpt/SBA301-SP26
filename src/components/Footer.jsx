import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Footer() {
    return (

        <footer>
             <Container fluid>
            <Row className="align-items-center">
                <Col xs={2}>
                    <Image src="/images/image.png" alt="Author Avatar" className="rounded-circle" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                </Col>
                <Col xs={8}>
                    <h5>Tác giả: &copy; DatLT</h5>
                    <small>All rights reserved.</small>
                </Col>
                <Col xs={2}>
                    <a href="mailto:lethanhdat20072005@gmail.com">lethanhdat20072005@gmail.com</a>    
                </Col>
            </Row>
        </Container>
        </footer>
    );
}

export default Footer;