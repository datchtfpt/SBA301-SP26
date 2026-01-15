import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

function Footer({ avatar, name, contact }) {
    return (
        <footer className="bg-light py-3 mt-auto">
            <Container>
                <Row className="align-items-center text-center text-md-start">
                    <Col xs={12} md={2} className="mb-2 mb-md-0">
                        <Image
                            src={avatar}
                            roundedCircle
                            style={{ width: 60, height: 60, objectFit: "cover" }}
                        />
                    </Col>

                    <Col xs={12} md={8}>
                        <h6 className="mb-0">Tác giả: © {name}</h6>
                        <small>All rights reserved.</small>
                    </Col>

                    <Col xs={12} md={2}>
                        <a href={`mailto:${contact}`}>{contact}</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
