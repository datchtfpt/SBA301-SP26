import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Orchid({ orchid, handleShow }) {
    return (
        <Card className="h-100">
        <Card.Img variant="top" src={orchid.image} />
        <Card.Body className="d-flex flex-column">
            <Card.Title>{orchid.id}. {orchid.orchidName}</Card.Title>

            <Card.Text className="flex-grow-1">
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

            <Button
                variant="primary"
                onClick={() => handleShow(orchid)}
            >
                View detail
            </Button>
        </Card.Body>
    </Card>
    );

}

export default Orchid;
