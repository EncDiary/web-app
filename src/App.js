import React from 'react'
import NotesList from './Diary/NotesList'
import Context from './context'
import AddNote from './Diary/AddNote'

function App(props) {
  const [notes, setNotes] = React.useState([
    {id: 1, opened: false, title: "Первая запись"},
    {id: 2, opened: false, title: "Вторая запись"},
    {id: 3, opened: false, title: "Третья запись"}
  ])

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
    setNotes(
      notes.filter(note => note.id !== id)
      )
  }

  function addNote(title) {
    setNotes(
      notes.concat([
        {
          title,
          id: Date.now(),
          opened: false
        }
      ])
    )
  }

  function redirect() {
    console.log("Редирект!!!")
    // this.props.history.push('/hello')
    props.history.push('/hadpageUrl') 
  }

  return (
    <Context.Provider value={{removeNote}}>
      <div className="wrapper container">
        <h1 className="text-center">Заголовок</h1>
        <AddNote onCreate={addNote} />
        { notes.length ? <NotesList notes={notes} onToggle={toggleNote} /> : <p>Записей пока нет</p>}
        
        <button onClick={() => redirect()}>Not Found</button>

      </div>
    </Context.Provider>
  );
}

export default App;
