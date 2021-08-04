import React, {useContext} from 'react'
import Swal from 'sweetalert2'
import { DeleteIcon } from '../assets/SvgIcons'
import Context from '../context'


function RemoveNote({note}) {
    const {removeNote} = useContext(Context)

    function getSlicedText(text) {
        var sliced = text.slice(0,100)
        if (sliced.length < text.length) {
            sliced += '...'
        }
        return sliced
    }


    function getModalWindow() {
        Swal.fire({
            title: 'Удалить запись',
            text: getSlicedText(note.text.replace(/<[^>]+>/g, '')),
            icon: 'error',
            showCloseButton: true,
            
            confirmButtonText: "Да",
            confirmButtonColor: "#51ac00",

            cancelButtonText: "Нет, не надо",
            cancelButtonColor: '#d33',
            showCancelButton: true,
            focusCancel: true
        }).then((result) => {
            if (result.isConfirmed)
                removeNote(note.id)
        })
    }

    return (
        <>
            <button className="button note__button" onClick={getModalWindow}>
                {DeleteIcon}
            </button>
        </>
    )
}

export default RemoveNote