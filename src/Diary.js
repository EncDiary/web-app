import React, {useRef, useEffect, useState} from 'react'
import NotesList from './Notes/NotesList'
import Header from './Components/Header'
import AddNote from './Notes/AddNote'
import { Container } from 'react-bootstrap'
import Settings from './Diary/Settings'
import Title from './Components/Title'
import { fetchGetNotes } from './ServerRequests'
import {getNotesHandler} from './Handlers/NoteHandlers'
import {AES, enc} from 'crypto-js'



function Diary({notes, currentBook, settings, setting, notesPassword, serverUrl, setNotes}) {


    const notesRef = useRef(null)
    const mainContentRef = useRef(null)

    function scrollToNotes() {
        mainContentRef.current.scrollTo({ top: notesRef.current.offsetTop, behavior: "smooth" })
    }


    const [fetching, setFetching] = useState(true)
    const [notesOver, setNotesOver] = useState(false)


    useEffect(() => {
        if (fetching && !notesOver) {
            fetchGetNotes(serverUrl, currentBook, notesPassword, 5, notes.length)
                .then (response => response.json())
                .then (response => {
                    // getNotesHandler(response, notes, notesPassword, setNotes)
                    

                    response['notes'].forEach(element => {
                        element['year'] = new Date(element.datetime).getFullYear()
                
                        element['text'] = AES.decrypt(element['text'], notesPassword).toString(enc.Utf8);
                    });
                    setNotes([...notes, ...response['notes']])
                    console.log(response['notes'].length)
                    if (response['notes'].length === 0) {
                        console.log("hello")
                        setNotesOver(true)
                    }

                })
                .finally(() => setFetching(false))
        }
    }, [fetching])


    useEffect(() => {
            
        mainContentRef.current.addEventListener('scroll', scrollHandler)
        // Убрал потому, что исчезает сам элемент
        // return function() {
        //     mainContentRef.current.removeEventListener('scroll', scrollHandler)
        // }
    }, [])


    const scrollHandler = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop - window.innerHeight + mainContentRef.current.offsetTop < 100) {
            setFetching(true)
        }
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