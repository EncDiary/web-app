import React from 'react'
import NoteItem from './NoteItem'
import NotesList from './NotesList'

function YearList(props) {


    return (
        <div className="note_item">
            

            {props.notes.map((note, index) => {
                return (
                    <>
                        {index}
                        <NotesList notes={note} />
                    </>
                )
            })}
        </div>
    )
}


export default YearList