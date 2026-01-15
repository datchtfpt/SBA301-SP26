import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

function MainLayout({ onSearchChange }) {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <Header onSearchChange={onSearchChange} />

            {/* Main content */}
            <main className="flex-fill py-4">
                <Container>
                    <Outlet />
                </Container>
            </main>

            {/* Footer */}
            <Footer
                avatar="images/image.png"
                name="Le Thanh Dat"
                contact="lethandat20072005@gmail.com"
            />
        </div>
    );
}

export default MainLayout;
