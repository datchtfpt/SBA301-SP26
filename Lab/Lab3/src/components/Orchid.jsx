import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Orchid({ orchid }) {
  return (
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

        <Button
          as={Link}
          to={`/orchids/${orchid.id}`}
          variant="primary"
        >
          View detail
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Orchid;
