import React, {useContext} from 'react'
import Swal from 'sweetalert2'
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
            // showConfirmButton: false
        }).then((result) => {
            if (result.isConfirmed)
                removeNote(note.id)
        })
    }

    return (
        <>
            <button className="button note__button" onClick={getModalWindow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>

            {/* <button className="btn btn-danger" onClick={getModalWindow}><i className="fas fa-trash-alt"></i></button> */}

        </>
    )
}

export default RemoveNote