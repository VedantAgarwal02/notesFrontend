import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import normalizeText from '../normalizeText';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

const SharedNavbar = () => {
  const [user, setUser] = useState("Fetching Name...");
  const navigate = useNavigate()
  useEffect(()=> {
    let temp = window.localStorage.getItem('user')
    temp=JSON.parse(temp)
    setUser(temp)
  }, [])

  const logout = ()=> {
    if(window.confirm('Are you sure you want to logout?')){
      window.localStorage.removeItem('user')
      // Cookies.remove('token')
      navigate('/auth/login')
     }
  }

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
      <Navbar.Brand style={{cursor:"pointer"}}>Notes Site</Navbar.Brand>
          <Nav className="me-auto">
          {/* <Nav.Link >
            {userRole==='employer'?'Post Job Opening':'View your applications'}
          </Nav.Link> */}
          <NavDropdown title="Options" id="basic-nav-dropdown">
              <NavDropdown.Item >Profile Page</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> logout()} >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {user?.email} 
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default SharedNavbar