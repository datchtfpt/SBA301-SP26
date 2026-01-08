import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { OrchidsData } from "../data/listOfOrchid.js";

function ListOfOrchid() {
    return (
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
                                    <span style={{ color: "red", fontWeight: "bold" }}>
                                        Special Orchid
                                    </span>
                                )}
                            </Card.Text>

                            <Button variant="primary">View detail</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default ListOfOrchid;
