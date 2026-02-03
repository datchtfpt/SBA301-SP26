import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import NavMenu from './Nav';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="d-flex flex-grow-1">
        <NavMenu />
        <main className="flex-grow-1 p-4 bg-light overflow-auto">
          <Outlet />
        </main>
        <div className="d-none d-lg-block p-3" style={{ minWidth: '240px' }}>
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}
