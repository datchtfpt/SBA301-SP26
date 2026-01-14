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
import Login from './components/Login.jsx';

function App() {
    const [searchTerm, setSearchTerm] = React.useState("");

    /* Layout SAU khi đăng nhập */
    const MainLayout = ({ children }) => (
        <>
            <Header onSearchChange={setSearchTerm} />
            {children}
            <Footer
                avatar={"images/image.png"}
                name={"Le Thanh Dat"}
                contact={"lethandat20072005@gmail.com"}
            />
        </>
    );

    return (
        <Router>
            <Routes>
                {/* LOGIN - KHÔNG header/footer */}
                <Route path="/" element={<Login />} />

                {/* CÁC TRANG SAU LOGIN */}
                <Route
                    path="/orchids"
                    element={
                        <MainLayout>
                            <ListOfOrchid searchTerm={searchTerm} />
                        </MainLayout>
                    }
                />

                <Route
                    path="/orchids/:id"
                    element={
                        <MainLayout>
                            <OrchidDetails />
                        </MainLayout>
                    }
                />

                <Route
                    path="/contact"
                    element={
                        <MainLayout>
                            <Contact />
                        </MainLayout>
                    }
                />

                <Route path="/about"
                    element={
                        <MainLayout>
                            <About />
                        </MainLayout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
