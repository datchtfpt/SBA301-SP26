import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const menuItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/category', label: 'Category' },
  { path: '/news', label: 'News' },
  { path: '/users', label: 'Users' },
  { path: '/settings', label: 'Settings' },
];

export default function NavMenu() {
  return (
    <Nav variant="pills" className="flex-column bg-dark p-3" style={{ minWidth: '200px' }}>
      {menuItems.map((item) => (
        <Nav.Item key={item.path}>
          <Nav.Link
            as={NavLink}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `text-light mb-1 rounded ${isActive ? 'bg-primary active' : ''}`
            }
          >
            {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}
