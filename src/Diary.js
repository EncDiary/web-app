import React from 'react'
import NotesList from './Diary/NotesList'
import AddNote from './Diary/AddNote'
import Title from './Components/Title'

function Diary({notes}) {
    return (
        <>
            <Title text={"Записи"}/>
            <AddNote /> 
            {notes.length ? <NotesList notes={notes} /> : <p>Записей пока нет</p>}
        </>
    )
}

export default Diary