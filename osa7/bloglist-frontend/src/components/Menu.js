import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const padding = {
  paddingRight: 5
}

const Menu = ({ user, handleLogout }) => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Navbar.Brand variant="dark">{user.name} logged in </Navbar.Brand>
          <Button variant="danger" as="span" onClick={handleLogout}>logout</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Menu

