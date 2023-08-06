import React, { useEffect, useState } from 'react'
import notesDb from '../notesDB.json'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import normalizeText from '../normalizeText';
import './css/Home.css'

const Home = () => {

  const [notes, setNotes] = useState()
  useEffect(()=> {
    setNotes(notesDb)
  }, [])

  return (
    <div className="main">
      <h3>Notes Available:</h3>
      <div id='notes'>
      {
        notesDb.map(note => {
          return  <NotesCard  note={note} /> 
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
      <ListGroup.Item> Branch : {note.branch.toUpperCase()} </ListGroup.Item>
    </ListGroup>
    <Card.Body>
      <a href={`${note?.link}`}>Link to Notes</a>
    </Card.Body>
  </Card>
}

export default Home