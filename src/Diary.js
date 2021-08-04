import React from 'react'
import NotesList from './Notes/NotesList'
import Header from './Components/Header'
import AddNote from './Notes/AddNote'
import { Container, Col } from 'react-bootstrap'

function Diary({notes, currentBook}) {
    return (
        <>
            <Header currentBook={currentBook} />
            
            <AddNote />
            
            <section className="notes">
                <div className="notes__title title">Список записей</div>
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