import React, {useContext} from 'react'
import Context from '../context'

function BookItem({book}) {
    const {changeCurrentBook, unsetBook} = useContext(Context)

    return (
        <div>
            <span onClick={() => changeCurrentBook(book)}>- {book.title}</span>
            --- 
            <span onClick={() => unsetBook(book.id)}>x</span>
        </div>
    )
}

export default BookItem