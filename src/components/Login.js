import React, { useState } from 'react'
import { InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import './css/Login.css'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
  const [isContributor, setIsContributor] = useState(true)

  const navigate = useNavigate()
  const handleClick = () => {
    const role = isContributor ? 'contributor' : 'student'
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if(!email || !password) {
      alert('Please provide all details.')
      return
    }

    console.log(typeof email, password)
    window.localStorage.setItem('user', JSON.stringify({role, email, password}))
    navigate('/')
  }

  return (
    <div id='login'>
      <div id="loginForm">
        <h2>Welcome to Notes Site</h2>
        <br />
        <h5>Please login to your account</h5>

        <section key={`inline-radio`} className="mb-3">

            <label htmlFor="radio" style={{padding:'2px'}}>Select your Role : </label>
            <Form.Check
            inline
            label="Contributor"
            name="radio"
            defaultChecked
            type='radio'
            id={`inline-radio-1`}
            onClick={()=>setIsContributor(true)}
            />

            <Form.Check
            inline
            label="Student"
            name="radio"
            type='radio'
            id={`inline-radio-2`}
            onClick={()=> setIsContributor(false)}
            />

        </section>

        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          E-Mail
        </InputGroup.Text>
        <Form.Control
          placeholder='Email goes here'
          id='email'
        />
      </InputGroup>
        <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Password
        </InputGroup.Text>
        <Form.Control
        type='password'
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Password'
          id='password'
        />
      </InputGroup>
      <Button variant="primary" onClick={handleClick} >Submit</Button>{' '}
      <small>Don't have account yet? <br /> <Link id='signupLink' to={'/auth/signup'} >Click here to Sign up!!</Link> </small>
      </div>
      <div id="loginDescription">
        <h3>Website Description</h3>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, totam! Blanditiis, ullam. Veritatis est veniam reprehenderit aut atque enim impedit corporis eveniet possimus sit debitis iure laboriosam culpa, doloremque adipisci?
      </div>
    </div>
  )
}

export default Login