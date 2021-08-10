import Swal from "sweetalert2"

export function lockBookHandler(setNotesPassword, setNotes, setSettings) {
    setNotesPassword("")
    setNotes([])
    setSettings(false)
}

export function unlockBookHandler(response, password, currentBook, setNotesPassword, getNotes, cookies, setCookie) {
    if (response['status']) {
        setNotesPassword(password)
        // getNotes(password)

        moveBookToTopHandler(currentBook, cookies, setCookie)

    } else {
        var input_field = document.getElementById("enter_password")
        input_field.classList.add("input-shake", "input-error")
        setTimeout(function() {
            input_field.classList.remove("input-shake")
        }, 1000)
    }
}

export function addBookHandler(response, title, cookies, setCookie, setCurrentBook, setCurrentTab) {
    var newBook = {
        id: response['id'],
        title
    }

    setCookie('books',
        [newBook, ...cookies.books], {maxAge: 315360000}
    )
    setCurrentBook(newBook)

    Swal.fire({
        title: 'Новая книга успешно добавлена',
        icon: 'success',
        timer: 1000
    })
    setCurrentTab("open")
}

export function findBookHandler(response, setCurrentBook, setCurrentTab, cookies, setCookie) {
    if (response['status']) {

        
        moveBookToTopHandler(response['book'], cookies, setCookie)

        setCurrentBook(response['book'])

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
}

export function moveBookToTopHandler(topBook, cookies, setCookie) {
    var books = cookies.books.filter(book => book.id !== topBook['id'])

    setCookie('books',
        [topBook, ...books], {maxAge: 315360000}
    )
}