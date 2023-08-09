import React, { useEffect, useState } from 'react'
import notesDb from '../notesDB.json'
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

const Home = () => {

  const [allNotes, setAllNotes] = useState()
  const [filteredNotes, setFilteredNotes] = useState([])
  const [notes, setNotes] = useState()
  const [filter, setFilter] = useState("Select Filter")
  const [isFiltered, setIsFiltered] = useState(false)
  useEffect(()=> {
    setAllNotes(notesDb)
    setNotes(notesDb)
    setFilteredNotes([])
  }, [])

  const handleFilter = async ()=> {
    if(filter === 'Select Filter') {
      alert('Please Select Filter Field')
      return;
    }

    if(document.getElementById("query").value==='') {
      setFilteredNotes({})
      setNotes(allNotes)
      return;
    }

    let query = camelCaseText(filter)
    let queryVal = document.getElementById('query').value
    queryVal = (camelCaseText(queryVal))
    // console.log(isFiltered, filteredNotes)


    if(query === 'subject') {
      setFilteredNotes(allNotes.filter(note => note.subject===queryVal))
    }

    if(query === 'branch') {
       setFilteredNotes(allNotes.filter(note => note.branch===queryVal))
    }

    if(query === 'year') {
       setFilteredNotes(allNotes.filter(note => note.year===queryVal))
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
    </section>

    <hr />
      <h3>Notes Available:</h3>
      
      <h5>{isFiltered && `(Filtered by ${filter})`} {isFiltered && <CloseButton onClick={()=>removeFilters()} />} </h5>
      <div id='notes'>   
      {
        isFiltered &&  (filteredNotes!==[] ? filteredNotes.map(note => {
          return <NotesCard note={note} />
        }) : <h1> Not Found </h1>)
      }
      {
        notes && ( notes!==[] ? notes.map(note => {
          return  <NotesCard  note={note} /> 
        }) : <h1>Not Found</h1>)
      }
      {
        // (isFiltered && !filteredNotes) && 
        (isFiltered && !filteredNotes) &&  <h1>No Notes Found</h1>
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
      <a href="https://drive.google.com/file/d/10O19qjoLXvel5ymNLOrb3mAnmfUupfeA/view?usp=sharing" target='_blank' rel="noreferrer" >Link to Notes</a>
    </Card.Body>
  </Card>
}

export default Home