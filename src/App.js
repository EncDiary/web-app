import React, {useEffect, useState} from 'react'
import Context from './context'
import Swal from 'sweetalert2'
import { AES, enc } from 'crypto-js'
import Diary from './Diary'
import Login from './Diary/Login'
import { useCookies } from 'react-cookie';
import { fetchAddNote, fetchEditNote, fetchGetNotes, fetchRemoveNote, fetchEnterPassword, fetchAddBook, fetchFindBook } from './ServerRequests'




function App() {
  const serverUrl = "https://cm42272.tmweb.ru/"

  const [notes, setNotes] = useState([])
  
  const [cookies, setCookie] = useCookies()


  // useEffect(() => {
  //   if (!cookies.books) {
  //     setCookie('books', [], {maxAge: 315360000})
  //   }
  // }, [])

  if (!cookies.books) {
    setCookie('books', [], {maxAge: 315360000})
  }

  const [currentBook, setCurrentBook] = useState(cookies.books && cookies.books[0]) // Пофиксить баг, если нет куков нужно их создать


  const [settings, setSettings] = useState(false)



  const [currentTab, setCurrentTab] = useState("open")


  


  const [notesPassword, setNotesPassword] = useState("")


  

  function removeNote(id) {
    fetchRemoveNote(serverUrl, currentBook.id, notesPassword, id)
      .then (response => response.json())
      .then (response => {
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
    })
  }


  function addNote(text) {
    fetchAddNote(serverUrl, currentBook.id, notesPassword, text)
      .then (response => response.json())
      .then (response => {
        var newNote = [{
          text,
          id: response['id'],
          datetime: response['datetime']
        }]
        setNotes(
          newNote.concat(notes)
        )
        Swal.fire({
          title: 'Запись успешно добавлена',
          icon: 'success',
          timer: 1000
        })
    })
  }


  function editNote(id, text) {
    fetchEditNote(serverUrl, currentBook.id, notesPassword, text, id)
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
            timer: 1000
          })
        }
    })
  }



  function enterPassword(password) {

    fetchEnterPassword(serverUrl, currentBook.id, password)
      .then (response => response.json())
      .then (response => {
        if (response['status']) {
          setNotesPassword(password)
          getNotes(password)
          moveBookToTop(currentBook)
        } else {
          var input_field = document.getElementById("enter_password")
          input_field.classList.add("input-shake", "input-error")
          setTimeout(function() {
            input_field.classList.remove("input-shake")
          }, 1000)
        }
    })
  }


  function getNotes(password=notesPassword) {
    fetchGetNotes(serverUrl, currentBook, password)
      .then (response => response.json())
      .then (response => {

        response['notes'].forEach(element => {
          element['year'] = new Date(element.datetime).getFullYear()

          element['text'] = AES.decrypt(element['text'], password).toString(enc.Utf8);
        });
        
        setNotes(response['notes'])

        
    })
  }


  function exportEncyptNotes() {
    fetchGetNotes(serverUrl, currentBook, notesPassword)
      .then (response => response.json())
      .then (response => {
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
    })
  }

  function lockDiary() {
    setNotesPassword("")
    setNotes([])
  }




// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------





  // function getBooks() {
  //   console.log("Books!!!")
  //   fetch("https://cm42272.tmweb.ru/getBooks.php")
  //     .then (response => response.json())
  //     .then (response => {
  //       setBooks(response)
  //   })
  // }


  function changeCurrentBook(book) {
    setCurrentBook(book)
  }

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
        var newBook = {
          id: response['id'],
          title
        }

        setCookie('books',
          [newBook, ...cookies.books], {maxAge: 315360000}
        )
        changeCurrentBook(newBook)

        Swal.fire({
          title: 'Новая книга успешно добавлена',
          icon: 'success',
          timer: 1000
        })
        setCurrentTab("open")
    })
  }

  function findBook(title) {
    fetchFindBook(serverUrl, title)
      .then (response => response.json())
      .then (response => {
        if (response['status']) {

          moveBookToTop(response['book'])
          changeCurrentBook(response['book'])

          Swal.fire({
            title: 'Книга найдена и готова к расшифровке',
            icon: 'success',
            timer: 1000
          })
          setCurrentTab("open")
        } else {
          Swal.fire({
            title: 'Такой книги нет',
            icon: 'error',
            timer: 1000
          })
        }
    })
  }

  function moveBookToTop(topBook) {

    var books = cookies.books.filter(book => book.id !== topBook['id'])

    setCookie('books',
      [topBook, ...books], {maxAge: 315360000}
    )
  }

  






// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

  


  return (
    <Context.Provider value={{addNote, removeNote, editNote, enterPassword, getNotes, lockDiary, changeCurrentBook, addBook, findBook,
    unsetBook, setSettings, exportEncyptNotes, setCurrentTab}}>
        
        {
          notesPassword
            ? <Diary notes={notes} currentBook={currentBook} settings={settings} />
            : <Login books={cookies.books || []} currentBook={currentBook} currentTab={currentTab} />
        }
        
    </Context.Provider>
  );
}

export default App;
