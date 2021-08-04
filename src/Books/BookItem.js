import React, {useContext} from 'react'
import { CrossIcon } from '../assets/SvgIcons'
import Context from '../context'

function BookItem({book, isActive}) {
    const {changeCurrentBook, unsetBook} = useContext(Context)

    var classItem = "open__last-item"
    if (isActive) {
        classItem += " open__last-item-active"
    }

    return (
        <div className={classItem}>
            <div className="open__last-item-text" onClick={() => changeCurrentBook(book)}>{book.title}</div>
            <div className="open__last-item-remove" onClick={() => unsetBook(book.id)}>{CrossIcon}</div>
        </div>
    )
}

export default BookItem