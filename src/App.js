import React, {useEffect, useState} from 'react'
import Context from './context'
import Diary from './Diary'
import Login from './Diary/Login'
import { useCookies } from 'react-cookie';
import { fetchAddNote, fetchEditNote, fetchGetNotes, fetchRemoveNote, fetchEnterPassword, fetchAddBook, fetchFindBook } from './ServerRequests'
import {addNoteHandler, removeNoteHandler, editNoteHandler, getNotesHandler, exportEncyptNotesHandler} from './Handlers/NoteHandlers'
import { addBookHandler, findBookHandler, lockBookHandler, unlockBookHandler } from './Handlers/BookHandlers'


function App() {
  const serverUrl = "https://cj38001.tmweb.ru/"

  const [notes, setNotes] = useState([])
  
  const [cookies, setCookie] = useCookies()


  // useEffect(() => {
  //   if (!cookies.books) {
  //     setCookie('books', [], {maxAge: 315360000})
  //   }
  // }, [])
  










  

  // let date = new Date()
  // date.setSeconds(date.getSeconds() + 10);

  // const [time, setTime] = useState(+(date))

  // function checkTime() {
  //   if (+(new Date()) > time) {
  //     console.log("ВРЕМЯ ВЫШЛО")
  //   }
  //   console.log(+(new Date()))
  //   console.log("Начало", time)
  // }

  // useEffect(() => {
  //   setInterval(checkTime, 1000);
  //   // console.log(+(new Date()))


  //   // if (seconds > 0 && timerActive) {
  //   //   setTimeout(setSeconds, 100, seconds - 1);
  //   // } else {
  //   //   setTimerActive(false);
  //   // }
  // }, [ time ]);










  if (!cookies.books) {
    setCookie('books', [], {maxAge: 315360000})
  }

  const [currentBook, setCurrentBook] = useState(cookies.books && cookies.books[0]) // Пофиксить баг, если нет куков нужно их создать
  const [settings, setSettings] = useState(false)
  const [currentTab, setCurrentTab] = useState("open")
  const [notesPassword, setNotesPassword] = useState("")



  // fetch(serverUrl + "index.php")
  //   .then(response => console.log(response))



  function removeNote(id) {
    fetchRemoveNote(serverUrl, currentBook.id, notesPassword, id)
      .then (response => response.json())
      .then (response => {
        removeNoteHandler(response, notes, id, setNotes)
    })
  }

  function addNote(text) {
    fetchAddNote(serverUrl, currentBook.id, notesPassword, text)
      .then (response => response.json())
      .then (response => {
        addNoteHandler(response, text, notes, setNotes)
    })
  }

  function editNote(id, text) {
    fetchEditNote(serverUrl, currentBook.id, notesPassword, text, id)
      .then (response => response.json())
      .then (response => {
        editNoteHandler(response, notes, text, id, setNotes)
    })
  }

  function getNotes(password=notesPassword) {
    fetchGetNotes(serverUrl, currentBook, password)
      .then (response => response.json())
      .then (response => {
        getNotesHandler(response, password, setNotes)
    })
  }

  function exportEncyptNotes() {
    fetchGetNotes(serverUrl, currentBook, notesPassword)
      .then (response => response.json())
      .then (response => {
        exportEncyptNotesHandler(response)
    })
  }




// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------




  function unlockBook(password) {
    fetchEnterPassword(serverUrl, currentBook.id, password)
      .then (response => response.json())
      .then (response => {
        unlockBookHandler(response, password, currentBook, setNotesPassword, getNotes, cookies, setCookie)
    })
  }

  function lockBook() {
    lockBookHandler(setNotesPassword, setNotes, setSettings)
  }

  // function getBooks() {
  //   console.log("Books!!!")
  //   fetch("https://cm42272.tmweb.ru/getBooks.php")
  //     .then (response => response.json())
  //     .then (response => {
  //       setBooks(response)
  //   })
  // }

  function unsetBook(id) {
    var newBooksList = cookies.books.filter(book => book.id !== id)
    setCookie('books', newBooksList, {maxAge: 315360000})
    
    if (currentBook.id === id) {
      setCurrentBook(newBooksList[0])
    }
  }

  function addBook(title, password) {
    fetchAddBook(serverUrl, title, password)
      .then (response => response.json())
      .then (response => {
        addBookHandler(response, title, cookies, setCookie, setCurrentBook, setCurrentTab)
    })
  }

  function findBook(title) {
    fetchFindBook(serverUrl, title)
      .then (response => response.json())
      .then (response => {
        findBookHandler(response, setCurrentBook, setCurrentTab, cookies, setCookie)
    })
  }

  function editOptions(currentSetting) {
    setCookie('setting', currentSetting, {maxAge: 315360000})
  }

  



// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

  


  return (
    <Context.Provider value={{addNote, removeNote, editNote, unlockBook, getNotes, lockBook, setCurrentBook, addBook, findBook,
    unsetBook, setSettings, exportEncyptNotes, setCurrentTab, setCookie, editOptions}}>
        
        {
          notesPassword
            ? <Diary notes={notes} currentBook={currentBook} settings={settings} setting={cookies.setting || {'edit': true, 'delete': true}} />
            : <Login books={cookies.books || []} currentBook={currentBook} currentTab={currentTab} />
        }
        
    </Context.Provider>
  );
}

export default App;
