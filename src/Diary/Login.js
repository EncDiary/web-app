import React, { useContext } from 'react'
import AddBook from '../Books/AddBook'
import FindBook from '../Books/FindBook'
import OpenList from './OpenList'
import OpenBook from './OpenBook'
import Context from '../context'

function Login({books, currentBook, openBookPanel, addBookListPanel, findBookPanel}) {

    const {showOpenBookPanel, showAddBookPanel, showFindBookPanel} = useContext(Context)

    return (
        <section className="open">
            <OpenList showOpenBookPanel={showOpenBookPanel} showAddBookPanel={showAddBookPanel} showFindBookPanel={showFindBookPanel} />
            

            {(openBookPanel) && <OpenBook books={books} currentBook={currentBook} />}
            
            {(addBookListPanel) && <AddBook />}
            {(findBookPanel) && <FindBook />}

        </section>
    )
}

export default Login