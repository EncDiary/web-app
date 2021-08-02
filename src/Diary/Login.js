import React from 'react'
import AddBook from './AddBook'
import BooksList from './BooksList'
import EnterPassword from './EnterPassword'
import FindBook from './FindBook'

function Login({books, currentBook}) {
    return (
        <>
            <EnterPassword currentBook={currentBook} />
            <AddBook />
            <BooksList books={books} />
            <FindBook />
        </>
    )
}

export default Login