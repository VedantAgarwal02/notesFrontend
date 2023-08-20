import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import { Outlet, useNavigate } from 'react-router-dom'

const AuthShared = () => {
  return (
    <div>
        <AuthNavbar />
        <Outlet />
    </div>
  )
}

const AuthNavbar = () => {
    const navigate = useNavigate()
    const imgStyle = {
        width:'30px',
        height:'30px',
        margin:'5px'
    }

    return (
        <Navbar bg="primary" id='authNavbar' data-bs-theme="dark">
            <Container>
                <img src="https://cdn-icons-png.flaticon.com/512/564/564445.png" alt="logo" style={imgStyle} />
                <Navbar.Brand onClick={()=>navigate('/')} style={{cursor:'pointer'}} >  Notes Site</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={()=> navigate('/contactus')} >Contact Us</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default AuthShared