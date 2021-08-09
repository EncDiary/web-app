import React from 'react'
import NoteItem from './NoteItem'

function NotesList({notes, setting}) {


    return (
        <>
            {/* <div className="notes__title title">Список записей</div> */}
            {notes.map((note, index) => {
                return <NoteItem note={note} key={note.id} setting={setting} />
            })}
        </>
    )
}


export default NotesList