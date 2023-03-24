import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

import '../styles/components/Topbar.css';

export default function Topbar() {
    return (
        <Navbar className="topbar" sticky="top">
            <Navbar.Brand href="#home">Kitchen Inventory</Navbar.Brand>
        </Navbar>
    );
}
