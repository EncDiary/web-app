import React from 'react'
import OpenList from './OpenList'
import OpenBook from './OpenBook'
import AddBook from '../Books/AddBook'
import FindBook from '../Books/FindBook'

function Login({books, currentBook, currentTab}) {


    function showCurrentTab() {
        switch(currentTab) {
            case "open":
                return <OpenBook books={books} currentBook={currentBook} />
            case "add":
                return <AddBook />
            case "find":
                return <FindBook />
            default:
                return ""
        }
    }

    return (
        <section className="open">
            <OpenList />

            {showCurrentTab()}

        </section>
    )
}

export default Login