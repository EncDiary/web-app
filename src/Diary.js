import React from 'react'
import NotesList from './Notes/NotesList'
import Header from './Components/Header'
import AddNote from './Notes/AddNote'
import { Container, Col } from 'react-bootstrap'
import Settings from './Diary/Settings'
import Title from './Components/Title'

function Diary({notes, currentBook, settings}) {
    return (
        <>
            <Header currentBook={currentBook} settings={settings} />
            
            
            
            {
                settings
                    ? <Settings settings={settings} />
                    : (
                        <>
                            <AddNote />
                            <section className="notes">
                                <Title text="Список записей" className="notes__title" />
                                <Container>
                                    <Col md={{ span: 8, offset: 2 }} >
                                        {notes.length ? <NotesList notes={notes} /> : <p>Записей пока нет</p>}
                                    </Col>
                                </Container>
                            </section>
                        </>
                    )
            }
            
        </>
    )
}

export default Diary