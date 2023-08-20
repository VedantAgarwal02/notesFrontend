import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import link from '../backendLink'

const PostNotes =  ({changeLoading}) => {
  const navigate=useNavigate()
  const handleClick =async ()=> {
    changeLoading(true, "Posting Notes")

    const subject=document.getElementById('subject').value
    const branch = document.getElementById('branch').value
    const year = document.getElementById('year').value
    const notesLink=document.getElementById('notesLink').value

    if(!subject || !branch || !year || !notesLink) {
      changeLoading(false)
      alert('Please fill out all fields.')
      return;
    }

    console.log(subject, branch, year, notesLink)
    try {
      const resp= await axios.post(`${link}/api/v1/notes/create-note`, {subject, branch, year, link:notesLink}, {
        headers : {
          Authorization:`Bearer ${Cookies.get('token')}`
        }
      })

      if(resp.status===200) {
        // alert('Note Created Successfully')
        navigate('/')
      }
      else {
        alert("Error in Posting Notes.")
      }
    }
    catch(error) {
      console.log(error)
      alert('Some Error Occured')
    }

    changeLoading(false)
  }

  return (
    <div id='postnotes' className='mb-3' >
      <h2>Enter the following Details:</h2>
      <Form id='notesform' > 
        <Form.Group className="mb-3 formItem">
          <Form.Label> Subject </Form.Label>
          <Form.Control type="text" placeholder="Enter Subject" id='subject' />
        </Form.Group>

        <Form.Group className="mb-3 formItem">
          <Form.Label>Branch</Form.Label>
          <Form.Control type="text" placeholder="Enter Branch" id='branch' />
        </Form.Group>

        <section className="formItem">
        <Form.Label>Year</Form.Label>
        {/* <Form.Group className='mb-3'> */}
          <Form.Select id='year' >
            <option>First</option>
            <option>Second</option>
            <option>Third</option>
            <option>Fourth</option>
          </Form.Select>
        {/* </Form.Group> */}
        </section>

        <Form.Group className='mb-3 formItem' >
          <Form.Label>Link</Form.Label>
          <Form.Control type='text' id='notesLink' placeholder='Paste the link here' />
          <Form.Text className="text-muted">
            Points to remember:
            <ul>
              <li>Make sure that the link is accessible by all.</li>
              <li>Please provide only the appropriate link, and help to maintain the integrity of our website.</li>
            </ul>
          </Form.Text>
        </Form.Group>

        <Button id='postnotesButton' variant="primary" onClick={()=>handleClick()} >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default PostNotes