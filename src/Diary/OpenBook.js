import React from 'react'
import EnterPassword from './EnterPassword'
import BooksList from '../Books/BooksList'

function OpenBook({books, currentBook}) {
    return (
        <div className="open__pass-area">
            <EnterPassword currentBook={currentBook} />
            <BooksList books={books} currentBook={currentBook} />
        </div>
    )
}

export default OpenBook