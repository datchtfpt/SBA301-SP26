// import './App.css'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ListOfOrchid from './components/ListOfOrchid.jsx'
import TestCount from './components/TestCount.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from './components/Contact.jsx';
import About from './components/About.jsx';
import OrchidDetails from './components/OrchidDetails.jsx';


function App() {

    const [searchTerm, setSearchTerm] = React.useState("");
    return (
        <Router>
            <Header onSearchChange={setSearchTerm} />

            <Routes>
                <Route path="/" element={<ListOfOrchid searchTerm={searchTerm} />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/orchids/:id" element={<OrchidDetails />} />
                
            </Routes>

            <Footer avatar={"images/image.png"} name={"Le Thanh Dat"} contact={"lethandat20072005@gmail.com"} />
        </Router>
    )
}

export default App
