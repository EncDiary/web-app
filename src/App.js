import React, {useEffect, useState} from 'react'
import Context from './context'
import Diary from './Diary'
import Login from './Diary/Login'
import { useCookies } from 'react-cookie';
import { fetchAddNote, fetchEditNote, fetchGetNotes, fetchRemoveNote, fetchEnterPassword, fetchAddBook, fetchFindBook } from './ServerRequests'
import {addNoteHandler, removeNoteHandler, editNoteHandler, getNotesHandler, exportEncyptNotesHandler} from './Handlers/NoteHandlers'
import { addBookHandler, findBookHandler, lockBookHandler, unlockBookHandler } from './Handlers/BookHandlers'
import { useIdleTimer } from 'react-idle-timer'
import Swal from 'sweetalert2';


function App() {
  const serverUrl = "https://cj38001.tmweb.ru/"

  const [notes, setNotes] = useState([])
  
  const [cookies, setCookie] = useCookies()








  const handleOnIdle = () => {
    lockBookHandler(setNotesPassword, setNotes, setSettings)
  }

  const {} = useIdleTimer({
    timeout: 1000 * 60 * 5, // 5 минут бездействия
    onIdle: handleOnIdle,
    debounce: 500
  })


  // useEffect(() => {
  //   if (!cookies.books) {
  //     setCookie('books', [], {maxAge: 315360000})
  //   }
  // }, [])
  








  const returnError = () => {
      Swal.fire({
        title: 'Произошла ошибка при отправке',
        icon: 'error'
      }) 
    }
  






  if (!cookies.books) {
    setCookie('books', [], {maxAge: 315360000})
  }

  const [currentBook, setCurrentBook] = useState(cookies.books && cookies.books[0]) // Пофиксить баг, если нет куков нужно их создать
  const [settings, setSettings] = useState(false)
  const [currentTab, setCurrentTab] = useState("open")
  const [notesPassword, setNotesPassword] = useState("")



  // fetch(serverUrl + "index.php")
  //   .then(response => console.log(response))


  




  // console.log(document.getElementById('main-content'))

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler)
  //   return function() {
  //     document.removeEventListener('scroll', scrollHandler)
  //   }
  // })


  // const scrollHandler = (e) => {
  //   console.log("scroll")
  // }




  function removeNote(id) {
    fetchRemoveNote(serverUrl, currentBook.id, notesPassword, id)
      .then (response => response.json())
      .then (response => {
        removeNoteHandler(response, notes, id, setNotes)
      })
      .catch(returnError)
  }

  function addNote(text) {
    fetchAddNote(serverUrl, currentBook.id, notesPassword, text)
      .then (response => response.json())
      .then (response => {
        addNoteHandler(response, text, notes, setNotes)
      })
      .catch(returnError)
  }

  function editNote(id, text) {
    fetchEditNote(serverUrl, currentBook.id, notesPassword, text, id)
      .then (response => response.json())
      .then (response => {
        editNoteHandler(response, notes, text, id, setNotes)
      })
      .catch(returnError)
  }

  function getNotes(password=notesPassword) {
    fetchGetNotes(serverUrl, currentBook, password)
      .then (response => response.json())
      .then (response => {
        getNotesHandler(response, notes, password, setNotes)
      })
      // .finally(() => {
      //   return true
      // })
      // .catch(returnError)
  }

  function exportEncyptNotes() {
    fetchGetNotes(serverUrl, currentBook, notesPassword)
      .then (response => response.json())
      .then (response => {
        exportEncyptNotesHandler(response)
      })
      .catch(returnError)
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
      .catch(returnError)
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
      .catch(returnError)
  }

  function findBook(title) {
    fetchFindBook(serverUrl, title)
      .then (response => response.json())
      .then (response => {
        findBookHandler(response, setCurrentBook, setCurrentTab, cookies, setCookie)
      })
      .catch(returnError)
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
            ? <Diary notes={notes} currentBook={currentBook} settings={settings} setting={cookies.setting || {'edit': true, 'delete': true}} notesPassword={notesPassword} serverUrl={serverUrl} setNotes={setNotes} />
            : <Login books={cookies.books || []} currentBook={currentBook} currentTab={currentTab} />
        }
        
    </Context.Provider>
  );
}

export default App;
