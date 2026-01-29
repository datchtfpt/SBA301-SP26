import { useParams } from "react-router-dom";
import { getOrchidById } from "../services/OrchidsServices";
import { useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function OrchidDetails() {
  const { id } = useParams();

  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrchidById(id)
      .then(res => {
        setOrchid(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  if (!orchid) {
    return <h2 style={{ textAlign: "center" }}>Orchid not found</h2>;
  }

  if (!orchid) {
    return <h2>Orchid not found</h2>;
  }

  return (
    <Card style={{ width: "30rem", margin: "20px auto" }}>
      <Card.Img variant="top" src={orchid.image} />
      <Card.Body>
        <Card.Title>{orchid.orchidName}</Card.Title>
        <Card.Text>
          <strong>Description:</strong> {orchid.description} <br />
          <strong>Category:</strong> {orchid.category} <br />
          <strong>Price:</strong> ${orchid.price} <br />
          {orchid.isSpecial && (
            <span style={{ color: "red", fontWeight: "bold" }}>
              Special Orchid
            </span>
          )}
        </Card.Text>

        <Button as={Link} to="/orchids" variant="secondary">
          Back to list
        </Button>
      </Card.Body>
    </Card>
  );
}

export default OrchidDetails;
