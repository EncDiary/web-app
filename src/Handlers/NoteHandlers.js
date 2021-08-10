import Swal from "sweetalert2"
import { AES, enc } from 'crypto-js'


export function removeNoteHandler(response, notes, id, setNotes) {
    if (response['status']) {
        setNotes(notes.filter(note => note.id !== id))
        Swal.fire({
            title: 'Запись успешно удалена',
            icon: 'success',
            timer: 1000
        })
    } else {
        Swal.fire({
            title: 'Что-то пошло не так',
            icon: 'error',
            timer: 1000
        })
    }
}

export function addNoteHandler(response, text, notes, setNotes) {
    var newNote = {
        text,
        id: response['id'],
        datetime: response['datetime']
    }
    setNotes([newNote, ...notes])
    Swal.fire({
        title: 'Запись успешно добавлена',
        icon: 'success',
        timer: 1000
    })
}

export function editNoteHandler(response, notes, text, id, setNotes) {
    if (response['status']) {
        setNotes(
            notes.map(note => {
                if (note.id === id) {
                    note.text = text
                }
                return note
            })
        )
        Swal.fire({
            title: 'Запись успешно отредактирована',
            icon: 'success',
            timer: 1000
        })
    }
}

export function getNotesHandler(response, notes, password, setNotes) {
    response['notes'].forEach(element => {
        element['year'] = new Date(element.datetime).getFullYear()

        element['text'] = AES.decrypt(element['text'], password).toString(enc.Utf8);
    });
    // setNotes([...notes, ...response['notes']])
    setNotes(response['notes'])

}

export function exportEncyptNotesHandler(response) {
    const myData = response['notes'];
    const fileName = "file";
    const json = JSON.stringify(myData);
    const blob = new Blob([json],{type:'application/json'});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}