import React from 'react'
import BookItem from './BookItem'

function BooksList({books, currentBook}) {
    return (
        <div className="open__last">
            {/* <BookItem book={currentBook} key={currentBook.id} /> */}
            {books.map((book, index) => {
                if (book.id === currentBook.id) {
                    return <BookItem book={book} key={book.id} index={index} isActive={true} />
                } else {
                    return <BookItem book={book} key={book.id} index={index} isActive={false} />
                }
            })}
        </div>
    )
}

export default BooksList