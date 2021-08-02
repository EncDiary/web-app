import React, {useContext, useState} from 'react'
import Context from '../context'


function AddBook() {
    const {addBook} = useContext(Context)
    const [title, setTitle] = useState("")
    const [password, setPassword] = useState("")

    function onChangeTitle(value) {
        setTitle(value)
        console.log(value)
    }

    function onChangePassword(value) {
        setPassword(value)
        console.log(value)
    }

    function submitHandler(event) {
        event.preventDefault();
        
        console.log("submit")
        addBook(title, password)
    }

    return (
        <>
            <div>Добавление новой книги</div>
            <form onSubmit={submitHandler}>
                <input type="text" onChange={(e) => onChangeTitle(e.target.value)} />
                <input type="text" onChange={(e) => onChangePassword(e.target.value)} />
                <button type="submit">Добавить</button>
            </form>
        </>
    )
}

export default AddBook