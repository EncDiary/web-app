import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Context from '../context'

function NoteItem({ note, index, onClick }) {
    const {removeNote} = useContext(Context)

    const classes = []

    if (note.opened) {
        classes.push('opened_note')
    }

    return (
        <div className={classes.join(' ') + " card card-body"}>
            <span className="d-flex justify-content-between">
                <div onClick={() => onClick(note.id)}>
                    <b>{index + 1}</b>
                    &nbsp;
                    {note.title}
                </div>
                <div>
                    <button className="btn btn-danger" onClick={removeNote.bind(null, note.id)}>x</button>
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