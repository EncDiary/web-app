import React from 'react'
import RemoveNote from './RemoveNote'
import EditNote from './EditNote'
import parse from 'html-react-parser'

function NoteItem({ note, index }) {


    var note_time = new Date(note.datetime)

    function getDate() {
        return (
            note_time.toLocaleString("ru", {year: 'numeric', month: 'long', day: 'numeric'})
        )
    }

    function getWeekDay() {
        return (
            note_time.toLocaleString("ru", {weekday: 'short'}).toUpperCase()
        )
    }

    function getTime() {
        return (
            note_time.toLocaleString("ru", {hour: 'numeric', minute: 'numeric'})
        )
    }

    return (
        <>
            
            <div className="note">


                <div className="note__header">
                    <div className="note__title">
                        <div className="note__date">
                            <span className="note__date-number">{getDate()}</span>
                            <span className="note__date-weekday">{getWeekDay()}</span>
                        </div>
                        <div className="note__time">
                            {getTime()}
                        </div>
                    </div>
                    <div className="note__management">
                        <EditNote note={note} />
                        <RemoveNote note={note} />
                    </div>
                </div>

                <div className="note__text">
                    {parse(note.text)}
                </div>
            </div>
        </>
    )
}


export default NoteItem