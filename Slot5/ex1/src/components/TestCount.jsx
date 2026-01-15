import React from "react";
import {Button} from "react-bootstrap";
import { useState } from "react";

function TestCount() {
    const [count, setCount] = useState(0);
    const handleIncrease = () => {
        setCount(count + 1);
    };

    return (
        <div className="d-flex justify-content-center align-items-center my-3">
            <h2 className="me-4">Count: {count}</h2>
            <Button variant="success" onClick={handleIncrease}>Click me</Button>
        </div>

    )
};


export default TestCount;