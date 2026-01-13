import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { OrchidsData } from "../data/listOfOrchid.js";
import FileterSort from "./FilterSort.jsx";
import React from "react";

function ListOfOrchid({searchTerm}) {

    const [filterCategory, setFilterCategory] = React.useState("");
    const [sortOption, setSortOption] = React.useState("");

    const handleFilterChange = (category) => {
        setFilterCategory(category);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    let resultOrchids = OrchidsData;

    // SEARCH
    if (searchTerm) {
        resultOrchids = resultOrchids.filter(o =>
            o.orchidName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // FILTER
    if (filterCategory) {
        resultOrchids = resultOrchids.filter(o =>
            o.category === filterCategory
        );
    }

    if (sortOption === "price-asc") {
        resultOrchids.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
        resultOrchids.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
        resultOrchids.sort((a, b) => a.orchidName.localeCompare(b.orchidName));
    } else if (sortOption === "name-desc") {
        resultOrchids.sort((a, b) => b.orchidName.localeCompare(a.orchidName));
    }   

    


    return (
        <>
        <FileterSort categories={[...new Set(OrchidsData.map(orchid => orchid.category))]} onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

        <Row xs={1} md={3} className="g-4" style={{ padding: "20px" }}>
            {resultOrchids.map((orchid) => (
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
        </>
    );
}

export default ListOfOrchid;
