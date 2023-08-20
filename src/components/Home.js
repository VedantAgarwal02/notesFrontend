import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {normalizeText, camelCaseText} from '../textConverter';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './css/Home.css'
import { Button } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton';
import axios from 'axios';
import link from '../backendLink'
import Cookies from 'js-cookie';

const Home = ({changeLoading}) => {

  const [allNotes, setAllNotes] = useState()
  const [filteredNotes, setFilteredNotes] = useState([])
  const [notes, setNotes] = useState()
  const [filter, setFilter] = useState("Select Filter")
  const [isFiltered, setIsFiltered] = useState(false)

  const fetchNotes = async()=> {
    changeLoading(true, "Loading Notes")
    try {
      const resp = await axios.get(`${link}/api/v1/notes/allnotes`, {
        headers:{
          Authorization:`Bearer ${Cookies.get('token')}`
        }
      })
      
      if(resp.status===200) {
        setAllNotes(resp.data.notes)
        setNotes(resp.data.notes)
        setFilteredNotes([])
      }
      else {
        console.log('some error1')
      }
    }
    catch(error) {
      alert("Some Error Occured")
      console.log('some error2')
    }
    changeLoading(false)
  }

  useEffect(()=> {
    fetchNotes()  
  }, [])

  const handleFilter = async ()=> {
    if(filter === 'Select Filter') {
      alert('Please Select the Filter that you wish to apply.')
      return;
    }

    if(document.getElementById("query").value==='') {
      setIsFiltered(false)
      setFilteredNotes([])
      setNotes(allNotes)
      return;
    }

    let query = camelCaseText(filter)
    let queryVal = document.getElementById('query').value


    if(query === 'subject') {
      setFilteredNotes(allNotes.filter(note => note.subject.toLowerCase()===queryVal))
    }

    if(query === 'branch') {
       setFilteredNotes(allNotes.filter(note => note.branch.toLowerCase()===queryVal))
    }

    if(query === 'year') {
       setFilteredNotes(allNotes.filter(note => note.year.toLowerCase()===queryVal))
    }

    setNotes([])
    setIsFiltered(true)
  }

  const removeFilters = ()=> {
    document.getElementById("query").value=''
    setFilter('Select Filter')
    setFilteredNotes([])
    setNotes(allNotes)
    setIsFiltered(false)
  }

  return (
    <div className="main">

    <h3>Filter Options : </h3>
    <section id="filter">
      <InputGroup className="mb-3">
      <DropdownButton
          variant="outline-success"
          title={filter}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item onClick={()=>setFilter('Subject')}> Subject </Dropdown.Item>
          <Dropdown.Item onClick={()=>setFilter('Branch')}> Branch </Dropdown.Item>
          <Dropdown.Item onClick={()=>setFilter('Year')}> Year </Dropdown.Item>
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" placeholder='Type Full Names' id='query' onChange={()=>handleFilter()} />
        <Button variant="outline-success" onClick={()=>handleFilter()}>
          Filter
        </Button>
      </InputGroup>
      <Form.Text className="text-muted" style={{textAlign:'left'}} >
            <h6>Instructions for Filtering:</h6>
            <ul>
              <li>Please enter complete name of the query that you wish to run.</li>
            </ul>
          </Form.Text>
    </section>

    <hr />
      <h3>Notes Available:</h3>
      <h5>{isFiltered && `(Filtered by ${filter})`} {isFiltered && <CloseButton onClick={()=>removeFilters()} />} </h5>
      {/* {(isFiltered&&filteredNotes.length===0) && <h5> No Notes Found </h5>}
       */}
       {/* {!notes && !filteredNotes && <h2> No Notes Found </h2>} */}
      <div id='notes'>   
      {
        isFiltered &&   filteredNotes.map(note => {
          return <NotesCard note={note} key={note._id} />
        }) 
      }
      {
        notes &&notes.map(note => {
          return  <NotesCard  note={note} key={note._id} /> 
        }) 
      }
    </div>
    </div>
  )
}

const NotesCard = ({note})=> {
  return <Card className='note' style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title> {normalizeText(note.subject)} </Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item> Year : {normalizeText(note.year)} </ListGroup.Item>
      <ListGroup.Item> Branch : {normalizeText(note?.branch)} </ListGroup.Item>
    </ListGroup>
    <Card.Body>
      <a href={note.link} target='_blank' rel="noreferrer" >Link to Notes</a>
    </Card.Body>
  </Card>
}

export default Home