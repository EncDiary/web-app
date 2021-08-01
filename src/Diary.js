import React from 'react'
import NotesList from './Diary/NotesList'
import Header from './Components/Header'
import AddNote from './Diary/AddNote'
import { Container, Col } from 'react-bootstrap'

function Diary({notes}) {
    return (
        <>
            <Header />
            
            <AddNote />
            
            <section className="notes">
                <Container>
                    <Col md={{ span: 8, offset: 2 }} >
                        {notes.length ? <NotesList notes={notes} /> : <p>Записей пока нет</p>}
                    </Col>
                </Container>
            </section>
            
            {/* <section className="notes container">
            </section>      */}
        </>
    )
}

export default Diary