//SearchSort.jsx to search orchids by name and sort them by price or name
// Use sort in FilterSort.jsx to sort the search results by price or name

import React from "react";
import { Form, Row, Col } from "react-bootstrap";

function SearchSort({ onSearchChange}) {
    const handleSearchChange = (e) => {
        onSearchChange(e.target.value);
    };

    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="searchOrchids">
                        <Form.Label>Search by Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter orchid name"
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Col>
            </Row> 
        </Form> 
    );
}  

export default SearchSort;