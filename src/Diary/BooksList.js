import React from 'react'
import BookItem from './BookItem'

function BooksList({books}) {
    return (
        <>
            <div>Список книг</div>
            {books.map((book, index) => {
                return <BookItem book={book} key={book.id} index={index} />
            })}
        </>
    )
}

export default BooksList