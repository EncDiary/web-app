import React from 'react'
import PropTypes from 'prop-types'
import NoteItem from './NoteItem'

function NotesList(props) {


    return (
        <div className="note_item">
            

            {props.notes.map((note, index) => {
                return <NoteItem note={note} key={note.id} index={index} />
            })}
        </div>
    )
}

// NotesList.propTypes = {
//     notes: PropTypes.arrayOf(PropTypes.object).isRequired,
//     onToggle: PropTypes.func.isRequired
// }

export default NotesList