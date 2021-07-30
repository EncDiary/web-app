import React, {useEffect} from 'react'
import NotesList from './Diary/NotesList'
import Context from './context'
import AddNote from './Diary/AddNote'
import Header from './Components/Header'
import Title from './Components/Title'
import Swal from 'sweetalert2'
import YearList from './Diary/YearList'



function App(props) {
  const [notes, setNotes] = React.useState([])
  useEffect(() => {
    fetch("https://cm42272.tmweb.ru/getNotes.php")
      .then (response => response.json())
      .then (response => {
        
        // console.log(response)
        response.forEach(element => {
          element['year'] = new Date(element.datetime).getFullYear()
          // element['month'] = new Date(element.datetime).getMonth()
        });
        
        setNotes(response)
    })
  }, [])


  function toggleNote(id) {
    setNotes(
      notes.map(note => {
      if (note.id === id) {
        note.opened = !note.opened
      }
      return note
    }))
  }

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
          text: text
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
          text: text
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

  function groupByNotes(notes, field) {
    var groupArray = []
    notes.forEach(note => {
      console.log(note['year'])
      if (note['year'] in groupArray) {
        groupArray[note['year']].push(note)
      } else {
        groupArray[note['year']] = [note]
        // groupArray.set(note['year'], new Array())
        // groupArray[note['year']].push(note)
      }
      
    });
    return groupArray
  }



  return (
    <Context.Provider value={{removeNote, toggleNote, editNote}}>
      <Header my_hist={props.history} />
      <div className="container">
        <Title text={"Записи"}/>
        <AddNote onCreate={addNote} />
        { notes.length ? <YearList notes={groupByNotes(notes, 'year')} /> : <p>Записей пока нет</p>}

        {
          // onToggle={toggleNote} от NotesList
            console.log('Группировка по году', groupByNotes(notes, 'year'))
        }
      </div>
    </Context.Provider>
  );
}

export default App;
