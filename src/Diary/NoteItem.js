import React from 'react'
import RemoveNote from './RemoveNote'
import EditNote from './EditNote'

function NoteItem({ note, index }) {
    const classes = []

    if (note.opened) {
        classes.push('opened_note')
    }

    var note_time = new Date(note.datetime)

    return (
        <>
            
            <div className={classes.join(' ') + " card card-body mb-4"}>
                <span className="d-flex justify-content-between">
                    <div>
                        {note_time.toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric'})}
                        ({(note_time.toLocaleString("ru", {weekday: 'short'}).toUpperCase())})
                        <br />
                        {note_time.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'})}
                        <hr />
                        <b>{index + 1}</b>
                        &nbsp;
                        {note.text}
                    </div>
                    <div>

                        <EditNote note={note} />
                        
                        <RemoveNote note={note} />
                    </div>
                </span>
            </div>
        </>
    )
}


export default NoteItem