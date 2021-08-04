import React, {useEffect, useState} from 'react'
import Context from './context'
import Swal from 'sweetalert2'
import { AES, enc, SHA256 } from 'crypto-js'
import Diary from './Diary'
import Login from './Diary/Login'
import { useCookies } from 'react-cookie';




function App() {
  const [notes, setNotes] = useState([])
  
  const [cookies, setCookie] = useCookies();

  // setCookie('books', [], {maxAge: 315360000}) // Пока костыль

  // setCookie('user', "idefant", {maxAge: 315360000})
  // setCookie('hello', "hi", {maxAge: 315360000})

  // console.log(cookies.hello)

  if (!cookies.books) {
    setCookie('books', [], {maxAge: 315360000})
    console.log('hello')
  }

  // useEffect(() => {
  //   if (!cookies.books) {
  //     setCookie('books', [], {maxAge: 315360000})
  //   }
  // }, [])

  const [currentBook, setCurrentBook] = useState(cookies.books[0]) // Пофиксить баг, если нет куков нужно их создать









  const [openBookPanel, setOpenBookPanel] = useState(true)
  const [addBookListPanel, setAddBookListPanel] = useState(false)
  const [findBookPanel, setFindBookPanel] = useState(false)

  function showOpenBookPanel() {
      setOpenBookPanel(true)
      setAddBookListPanel(false)
      setFindBookPanel(false)
  }

  function showAddBookPanel() {
      setOpenBookPanel(false)
      setAddBookListPanel(true)
      setFindBookPanel(false)
  }

  function showFindBookPanel() {
      setOpenBookPanel(false)
      setAddBookListPanel(false)
      setFindBookPanel(true)
  }


  
  






  

  


  const [notesPassword, setNotesPassword] = useState("")

  

  function removeNote(id) {
    fetch("https://cm42272.tmweb.ru/note/deleteNote.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          id: id,
          book_id: currentBook.id,
          password_hash: SHA256(notesPassword).toString()
        })
      })
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
    fetch("https://cm42272.tmweb.ru/note/addNote.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          text: AES.encrypt(text, notesPassword).toString(),
          book_id: currentBook.id,
          password_hash: SHA256(notesPassword).toString()
        })
      })
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
    fetch("https://cm42272.tmweb.ru/note/editNote.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          id: id,
          text: AES.encrypt(text, notesPassword).toString(),
          book_id: currentBook.id,
          password_hash: SHA256(notesPassword).toString()
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
            timer: 1000
          })
        }
    })
  }



  function enterPassword(password) {


    fetch("https://cm42272.tmweb.ru/checkPassword.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          id: currentBook.id,
          password_hash: SHA256(password).toString()
        })
      })
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
    console.log("Refresh!!!")
    fetch("https://cm42272.tmweb.ru/note/getNotes.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          id: currentBook.id,
          password_hash: SHA256(password).toString()
        })
      })
      .then (response => response.json())
      .then (response => {
        response['notes'].forEach(element => {
          element['year'] = new Date(element.datetime).getFullYear()

          element['text'] = AES.decrypt(element['text'], password).toString(enc.Utf8);
        });
        
        setNotes(response['notes'])
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
    console.log(book)
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
    fetch("https://cm42272.tmweb.ru/book/addBook.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          title: title,
          password_hash: SHA256(password).toString()
        })
      })
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
        showOpenBookPanel()
    })
  }

  function findBook(title) {
    fetch("https://cm42272.tmweb.ru/book/findBook.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          title: title
        })
      })
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
          showOpenBookPanel()
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
    console.log(topBook)
    console.log(cookies.books)

    var books = cookies.books.filter(book => book.id !== topBook['id'])

    console.log(books)

    setCookie('books',
      [topBook, ...books], {maxAge: 315360000}
    )
  }

  






// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

  


  return (
    <Context.Provider value={{addNote, removeNote, editNote, enterPassword, getNotes, lockDiary, changeCurrentBook, addBook, findBook,
    unsetBook, showOpenBookPanel, showAddBookPanel, showFindBookPanel}}>
        
        {
          notesPassword
            ? <>
                <Diary notes={notes} currentBook={currentBook} />
              </>
            : <>
                <Login books={cookies.books} currentBook={currentBook} openBookPanel={openBookPanel} addBookListPanel={addBookListPanel} findBookPanel={findBookPanel} />
              </>
        }
        
    </Context.Provider>
  );
}

export default App;
