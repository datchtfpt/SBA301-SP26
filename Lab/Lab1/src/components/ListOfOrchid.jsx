import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { OrchidsData } from "../data/listOfOrchid.js";

function ListOfOrchid() {
    const [show, setShow] = useState(false);
    const [selectedOrchid, setSelectedOrchid] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = (orchid) => {
        setSelectedOrchid(orchid);
        setShow(true);
    };

    return (
        <>
            <Row xs={1} md={3} className="g-4" style={{ padding: "20px" }}>
                {OrchidsData.map((orchid) => (
                    <Col key={orchid.id}>
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src={orchid.image} />
                            <Card.Body>
                                <Card.Title>
                                    {orchid.id}. {orchid.orchidName}
                                </Card.Title>

                                <Card.Text>
                                    {orchid.description}
                                    <br />
                                    <strong>Category:</strong> {orchid.category}
                                    <br />
                                    {orchid.isSpecial && (
                                        <span
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Special Orchid
                                        </span>
                                    )}
                                </Card.Text>

                                <Button
                                    variant="primary"
                                    onClick={() => handleShow(orchid)}
                                >
                                    View detail
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedOrchid?.orchidName}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {selectedOrchid && (
                        <>
                            <img
                                src={selectedOrchid.image}
                                alt={selectedOrchid.orchidName}
                                style={{
                                    width: "100%",
                                    marginBottom: "15px",
                                }}
                            />

                            <p>{selectedOrchid.description}</p>

                            <p>
                                <strong>Category:</strong>{" "}
                                {selectedOrchid.category}
                            </p>

                            {selectedOrchid.isSpecial && (
                                <p
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Special Orchid
                                </p>
                            )}
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ListOfOrchid;
