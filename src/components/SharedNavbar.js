import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import {normalizeText} from '../textConverter';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SharedNavbar = () => {
  const [user, setUser] = useState({username:"--Fetching Your Name--"});
  const navigate = useNavigate()
  useEffect(()=> {
    let temp = window.localStorage.getItem('user')
    temp=JSON.parse(temp)
    setUser(temp)
  }, [])

  const logout = ()=> {
    if(window.confirm('Are you sure you want to logout?')){
      window.localStorage.removeItem('user')
      Cookies.remove('token')
      navigate('/auth/login')
     }
  }

  const imgStyle = {
    width:'30px',
    height:'30px',
    margin:'5px'
}

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
      <img src="https://cdn-icons-png.flaticon.com/512/564/564445.png" alt="logo" style={imgStyle} />
      <Navbar.Brand style={{cursor:"pointer"}} onClick={()=> navigate('/')} >Notes Site</Navbar.Brand>
          <Nav className="me-auto">
          {user?.role==='contributor' && <Nav.Link onClick={()=> navigate('/postnotes')} >Post Notes</Nav.Link> }
          <NavDropdown title="Options" id="basic-nav-dropdown">
              <NavDropdown.Item >Profile Page</NavDropdown.Item>
              <NavDropdown.Item onClick={()=> logout()} >Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {user?.username} 
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default SharedNavbar