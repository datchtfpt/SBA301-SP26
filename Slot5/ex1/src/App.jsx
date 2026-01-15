import './App.css'
import ListOfOrchid from './pages/ListOfOrchid.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import OrchidDetails from './pages/OrchidDetails.jsx';
import Login from './pages/Login.jsx';
import MainLayout from './components/MainLayout.jsx';


function App() {
    const [searchTerm, setSearchTerm] = React.useState("");

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<MainLayout onSearchChange={setSearchTerm} />}>
                    <Route path="/orchids" element={<ListOfOrchid searchTerm={searchTerm} />} />
                    <Route path="/orchids/:id" element={<OrchidDetails />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
