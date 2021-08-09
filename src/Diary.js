import React, {useRef} from 'react'
import NotesList from './Notes/NotesList'
import Header from './Components/Header'
import AddNote from './Notes/AddNote'
import { Container, Col } from 'react-bootstrap'
import Settings from './Diary/Settings'
import Title from './Components/Title'

function Diary({notes, currentBook, settings, setting}) {

    const notesRef = useRef(null)
    const mainContentRef = useRef(null)

    function scrollToNotes() {
        mainContentRef.current.scrollTo({ top: notesRef.current.offsetTop, behavior: "smooth" })
    }
    
    return (
        <>
            <Header currentBook={currentBook} settings={settings} />
            
            
            <div id="main-content" ref={mainContentRef}>
                {
                    <>
                        <AddNote scrollToNotes={scrollToNotes} />
                        <section className="notes" ref={notesRef}>
                            <Container>
                                <div className="container-wrapper" >
                                    <Title text="Список записей" className="notes__title" />
                            
                                
                                    {notes.length ? <NotesList notes={notes} setting={setting} /> : <p>Записей пока нет</p>}
                                </div>
                            </Container>
                        </section>
                        {settings && <Settings settings={settings} setting={setting} /> }
                    </>
                }
            </div>    
        </>
    )
}

export default Diary