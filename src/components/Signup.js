import React, {useState} from 'react'
import { InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import './css/Signup.css'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [isContributor, setIsContributor] = useState(true)
  const navigate = useNavigate()
  const handleSubmit = () => {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value
    const role = isContributor ? 'contributor' : 'student'

    if(!name || !email || !password || !confirmPassword) {
      alert('Please enter all details')
      return
    }

    if(password !== confirmPassword) {
      alert('Password and ConfirmPassword do not match')
      return
    }

    window.localStorage.setItem('user', JSON.stringify({name, email, password, role}))
    // console.log(name, email, password, confirmPassword, role);
    navigate('/')
  }
  return (
    <div id='signup'>
      <div id="signupForm">
        <h2>Welcome to Notes Site</h2>
        <br />
        <h5>Create an account</h5>
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
          <InputGroup.Text>
            Name
          </InputGroup.Text>
          <Form.Control
            placeholder='Name goes here'
            id='name'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>
            E-Mail
          </InputGroup.Text>
          <Form.Control
            placeholder='Email goes here'
            id='email'
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text >
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
        <InputGroup className="mb-3">
          <InputGroup.Text >
            Confirm-Password
          </InputGroup.Text>
          <Form.Control
            type='password'
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder='Re-type your Password'
            id='confirmPassword'
          />
        </InputGroup>
      <Button variant="primary" onClick={handleSubmit} >Submit</Button>{' '}
      <small>Alredy have an account? <br /> <Link id='loginLink' to={'/auth/login'} >Click here to Login!!</Link> </small>
      </div>

      <div id="signupDescription">
        <h3>Website Description</h3>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, totam! Blanditiis, ullam. Veritatis est veniam reprehenderit aut atque enim impedit corporis eveniet possimus sit debitis iure laboriosam culpa, doloremque adipisci?
      </div>
      
    </div>
  )
}

export default Signup