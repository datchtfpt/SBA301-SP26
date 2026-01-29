import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import FileterSort from "../components/FilterSort.jsx";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useMemo } from "react";
import { getAllOrchids } from "../services/OrchidsServices.js";
import Orchid from "../components/Orchid.jsx";

function ListOfOrchid({ searchTerm }) {

    const [orchids, setOrchids] = useState([]);
    const [filterCategory, setFilterCategory] = useState("");
    const [sortOption, setSortOption] = useState("");

    // gọi API khi component mount
    useEffect(() => {
        getAllOrchids()
            .then(res => setOrchids(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleFilterChange = (category) => {
        setFilterCategory(category);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    // SEARCH + FILTER + SORT (CHUẨN, KHÔNG MUTATE DATA GỐC)
    const resultOrchids = useMemo(() => {
        let data = [...orchids];

        if (searchTerm) {
            data = data.filter(o =>
                o.orchidName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterCategory) {
            data = data.filter(o => o.category === filterCategory);
        }

        if (sortOption === "price-asc") {
            data.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
            data.sort((a, b) => b.price - a.price);
        } else if (sortOption === "name-asc") {
            data.sort((a, b) => a.orchidName.localeCompare(b.orchidName));
        } else if (sortOption === "name-desc") {
            data.sort((a, b) => b.orchidName.localeCompare(a.orchidName));
        }

        return data;
    }, [orchids, searchTerm, filterCategory, sortOption]);

    // danh sách category lấy từ API
    const categories = [...new Set(orchids.map(o => o.category))];

    return (
        <>
            <FileterSort
                categories={categories}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
            />

            <Row xs={1} md={3} className="g-4" style={{ padding: "20px" }}>
                {resultOrchids.map((orchid) => (
                    <Col key={orchid.id}>
                        <Orchid orchid={orchid} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default ListOfOrchid;
