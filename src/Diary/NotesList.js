import React from 'react'
import NoteItem from './NoteItem'

function NotesList({notes, i}) {


    return (
        <div className="note_item">
            

            {notes.map((note, index) => {
                return <NoteItem note={note} key={note.id} index={index} />
            })}
        </div>
    )
}


export default NotesList