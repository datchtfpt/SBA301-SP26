import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Orchid() {
    const orchid = {
        id: "1",
        orchidName: "Ceasar 4N",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu.",
        category: "Dendrobium",
        isSpecial: true,
        image: "/images/orchid1.png"
    };

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={orchid.image} />
            <Card.Body>
                <Card.Title>{orchid.id}. {orchid.orchidName}</Card.Title>

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
    );
}

export default Orchid;
