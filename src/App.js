import React, {useEffect, useState} from 'react'
import Context from './context'
import Swal from 'sweetalert2'
import { AES, enc, SHA256 } from 'crypto-js'
import Diary from './Diary'
import Login from './Diary/Login'
import { useCookies } from 'react-cookie';



function App() {
  const [notes, setNotes] = useState([])
  
  const [books, setBooks] = useState([])
  
  const [cookies, setCookie] = useCookies(["books"]);

  // setCookie('books', [{id: 1, title: "admin"}])

  console.log(cookies.books)


  const [currentBook, setCurrentBook] = useState({id: 2, title: "hello"})

  // console.log(useCookies(['books']))

  useEffect(() => {
    fetch("https://cm42272.tmweb.ru/getBooks.php")
      .then (response => response.json())
      .then (response => {
        setBooks(response)
    })
  }, [])


  const [notesPassword, setNotesPassword] = useState("")

  

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
          text: AES.encrypt(text, notesPassword).toString(),
          book_id: currentBook.id
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
    fetch("https://cm42272.tmweb.ru/getNotes.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          id: currentBook.id
        })
      })
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
    console.log(book.id)
    setCurrentBook(book)
  }

  function unsetBook(id) {
    console.log(id)
    setCookie('books', cookies.books.filter(book => book.id !== id))
  }


  function addBook(title, password) {
    // console.log(title, password)
    fetch("https://cm42272.tmweb.ru/addBook.php", {
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
        var newBook = [{
          id: response['id'],
          title
        }]

        // Пока что это будет заблочено
        
        // setBooks(
        //   books.concat(newBook)
        // )

        setCookie('books',
          cookies.books.concat(newBook)
        )

        Swal.fire({
          title: 'Новая книга успешно добавлена',
          icon: 'success',
          timer: 1000
        })
    })
  }

  function findBook(title) {
    fetch("https://cm42272.tmweb.ru/findBook.php", {
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
          
          // Пока что это будет заблочено
        
          // setBooks(
          //   books.concat(response["book"])
          // )

          // setCookie('books', [{id: 1, title: "admin"}])


          
          setCookie('books',
            cookies.books.concat(response["book"])
          )

          Swal.fire({
            title: 'Книга найдена и готова к расшифровке',
            icon: 'success',
            timer: 1000
          })
        } else {
          Swal.fire({
            title: 'Такой книги нет',
            icon: 'error',
            timer: 1000
          })
        }
    })
  }

  






// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------

  


  return (
    <Context.Provider value={{addNote, removeNote, editNote, enterPassword, getNotes, lockDiary, changeCurrentBook, addBook, findBook, unsetBook}}>
      {/* <Header my_hist={props.history} /> */}
      {/* <div className="container"> */}
        
        {
          notesPassword
            ? <>
                {/* <button onClick={() => getNotes()}>Refresh!!!</button>
                <button onClick={() => lockDiary()}>Lock!!!</button> */}
                <Diary notes={notes} />
              </>
            : <>
                <Login books={cookies.books} currentBook={currentBook} />
              </>
        }
        
      {/* </div> */}
    </Context.Provider>
  );
}

export default App;
