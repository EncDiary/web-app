import React from 'react'
import Context from './context'
import Header from './Components/Header'
import Swal from 'sweetalert2'
import { AES, enc, SHA256 } from 'crypto-js'
import EnterPassword from './Diary/EnterPassword'
import Diary from './Diary'



function App(props) {
  const [notes, setNotes] = React.useState([])

  // useEffect(() => {
  //   fetch("https://cm42272.tmweb.ru/getNotes.php")
  //     .then (response => response.json())
  //     .then (response => {
  //       response.forEach(element => {
  //         element['year'] = new Date(element.datetime).getFullYear()
  //       });
        
  //       setNotes(response)
  //   })
  // }, [])


  const [notesPassword, setNotesPassword] = React.useState("")

  

  function removeNote(id) {
    fetch("https://cm42272.tmweb.ru/deleteNote.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          id: id
        })
      })
      .then (response => response.json())
      .then (response => {
        if (response['status']) {
          setNotes(notes.filter(note => note.id !== id))
          Swal.fire({
            title: 'Запись успешно удалена',
            icon: 'success',
            timer: 1000,
            // showConfirmButton: false
          })
        } else {
          Swal.fire({
            title: 'Что-то пошло не так',
            icon: 'error',
            timer: 1000
          })
        }
    })
  }


  function addNote(text) {
    fetch("https://cm42272.tmweb.ru/addNote.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          text: AES.encrypt(text, notesPassword).toString()
        })
      })
      .then (response => response.json())
      .then (response => {
        var newNote = [{
          text,
          id: response['id'],
          opened: false,
          datetime: response['datetime']
        }]
        setNotes(
          newNote.concat(notes)
        )
        Swal.fire({
          title: 'Запись успешно добавлена',
          icon: 'success',
          timer: 1000,
          // showConfirmButton: false
        })
    })
  }


  function editNote(id, text) {
    fetch("https://cm42272.tmweb.ru/editNote.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          id: id,
          text: AES.encrypt(text, notesPassword).toString()
        })
      })
      .then (response => response.json())
      .then (response => {
        if (response['status']) {
          setNotes(
            notes.map(note => {
            if (note.id === id) {
              note.text = text
            }
            return note
          }))
          Swal.fire({
            title: 'Запись успешно отредактирована',
            icon: 'success',
            timer: 1000,
            // showConfirmButton: false
          })
        }
    })
  }

  function enterPassword(password) {
    console.log("Пароль введен")
    if (SHA256(password).toString() === "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918") {
      setNotesPassword(password)
      getNotes(password)
    } else {
      var input_field = document.getElementById("enter_password")
      input_field.classList.add("input-shake", "input-error")
      setTimeout(function() {
        input_field.classList.remove("input-shake")
      }, 1000)
    }
  }


  function getNotes(password=notesPassword) {
    console.log("Refresh!!!")
    fetch("https://cm42272.tmweb.ru/getNotes.php")
      .then (response => response.json())
      .then (response => {
        response.forEach(element => {
          element['year'] = new Date(element.datetime).getFullYear()


          element['text'] = AES.decrypt(element['text'], password).toString(enc.Utf8);
        });
        
        setNotes(response)
    })
  }

  function lockDiary() {
    console.log("Lock!!!")
    setNotesPassword("")
    setNotes([])
  }
  


  return (
    <Context.Provider value={{addNote, removeNote, editNote, enterPassword, getNotes}}>
      <Header my_hist={props.history} />
      <div className="container">
        
        {
          notesPassword
            ? <>
                <button onClick={() => getNotes()}>Refresh!!!</button>
                <button onClick={() => lockDiary()}>Lock!!!</button>
                <Diary notes={notes} />
              </>
            : <>
                <EnterPassword />
              </>
        }
        
      </div>
    </Context.Provider>
  );
}

export default App;
