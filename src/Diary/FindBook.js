import React, {useContext, useState} from 'react'
import Context from '../context'

function FindBook() {
    const {findBook} = useContext(Context)
    const [title, setTitle] = useState("")

    function onChangeTitle(value) {
        setTitle(value)
        console.log(value)
    }

    function submitHandler(event) {
        event.preventDefault();
        
        console.log("submit")
        findBook(title)
    }


    return (
        <div>
            <hr />
            Найти книгу
            <form onSubmit={submitHandler}>
                <input type="text" onChange={(e) => onChangeTitle(e.target.value)} />
                <button type="submit">Найти</button>
            </form>
        </div>
    )
}

export default FindBook