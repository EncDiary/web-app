import React, {useContext} from 'react'
import Swal from 'sweetalert2'
import Context from '../context'


function RemoveNote({note}) {
    const {removeNote} = useContext(Context)


    function getModalWindow() {
        Swal.fire({
            title: 'Удалить запись',
            text: note.text,
            icon: 'error',
            showCloseButton: true,
            
            confirmButtonText: "Да",
            confirmButtonColor: "#51ac00",

            cancelButtonText: "Нет, не надо",
            cancelButtonColor: '#d33',
            showCancelButton: true,
            focusCancel: true
            // showConfirmButton: false
        }).then((result) => {
            if (result.isConfirmed)
                removeNote(note.id)
        })
    }

    return (
        <>
            <button className="btn btn-danger" onClick={getModalWindow}><i className="fas fa-trash-alt"></i></button>

        </>
    )
}

export default RemoveNote