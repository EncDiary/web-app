import React from 'react'
import NoteItem from './NoteItem'

function NotesList({notes, i}) {


    return (
        <>
            {notes.map((note, index) => {
                return <NoteItem note={note} key={note.id} index={index} />
            })}
        </>
    )
}


export default NotesList