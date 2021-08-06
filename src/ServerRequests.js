import { SHA256, AES } from 'crypto-js'

export function fetchGetNotes(serverUrl, currentBook, password) {
    return fetch(serverUrl + "note/getNotes.php", {
        method: "POST",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          id: currentBook.id,
          password_hash: SHA256(password).toString()
        })
      })
}

export function fetchRemoveNote(serverUrl, currentBook_id, notesPassword, note_id) {
  return fetch(serverUrl + "note/deleteNote.php", {
    method: "POST",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      id: note_id,
      book_id: currentBook_id,
      password_hash: SHA256(notesPassword).toString()
    })
  })
}

export function fetchAddNote(serverUrl, currentBook_id, notesPassword, text) {
  return fetch(serverUrl + "note/addNote.php", {
    method: "POST",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      text: AES.encrypt(text, notesPassword).toString(),
      book_id: currentBook_id,
      password_hash: SHA256(notesPassword).toString()
    })
  })
}

export function fetchEditNote(serverUrl, currentBook_id, notesPassword, text, note_id) {
  return fetch(serverUrl + "note/editNote.php", {
    method: "POST",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      id: note_id,
      text: AES.encrypt(text, notesPassword).toString(),
      book_id: currentBook_id,
      password_hash: SHA256(notesPassword).toString()
    })
  })
}

export function fetchEnterPassword(serverUrl, currentBook_id, notesPassword) {
  return fetch(serverUrl + "checkPassword.php", {
    method: "POST",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      id: currentBook_id,
      password_hash: SHA256(notesPassword).toString()
    })
  })
}

export function fetchAddBook(serverUrl, title, notesPassword) {
  return fetch(serverUrl + "book/addBook.php", {
    method: "POST",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      title: title,
      password_hash: SHA256(notesPassword).toString()
    })
  })
}

export function fetchFindBook(serverUrl, title) {
  return fetch(serverUrl + "book/findBook.php", {
    method: "POST",
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      title: title
    })
  })
}