import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Footer( {avatar,name,contact} ) {   
     return (
        <footer>
             <Container fluid>
            <Row className="align-items-center">
                <Col xs={2}>
                    <Image src={avatar} alt="Author Avatar" className="rounded-circle" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                </Col>
                <Col xs={8}>
                    <h5>Tác giả: &copy; {name} </h5>
                    <small>All rights reserved.</small>
                </Col>
                <Col xs={2}>
                    <a href={'mailto:${contact}'}> {contact} </a>    
                </Col>
            </Row>
        </Container>
        </footer>
    );
}

export default Footer;