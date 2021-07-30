import React from 'react'
import PropTypes from 'prop-types'
import RemoveNote from './RemoveNote'
import EditNote from './EditNote'

function NoteItem({ note, index }) {
    const classes = []

    if (note.opened) {
        classes.push('opened_note')
    }

    var note_time = new Date(note.datetime)

    return (
        <div className={classes.join(' ') + " card card-body"}>
            <span className="d-flex justify-content-between">
                <div>
                    <span>{note_time.getFullYear()}.{note_time.getMonth()}.{note_time.getDate()} - {note_time.getHours()}:{note_time.getMinutes()}:{note_time.getSeconds()}</span>
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

    )
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
    index: PropTypes.number,
    onClick: PropTypes.func.isRequired
}

export default NoteItem