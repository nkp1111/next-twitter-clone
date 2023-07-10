"use client";

import Image from 'next/image'
import logo from '@/public/images/tweeter.svg'
import navbarData from "@/constants/navData"

// bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="sm">
        <Container>
          <Navbar.Brand href="/">
            <Image
              src={logo}
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {navbarData.map(item => (
                <Nav.Link href={item.link} key={item.title}>
                  {item.title[0].toUpperCase() + item.title.substring(1,)}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>

          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Register</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              LogIn
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Tweeter
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.5">Logout</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
