import React, {useContext, useState} from 'react'
import Context from '../context'
import {Form} from 'react-bootstrap'


function AddBook() {
    const {addBook} = useContext(Context)
    const [title, setTitle] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")

    function onChangeTitle(value) {
        setTitle(value)
    }

    function onChangePassword(value) {
        setPassword(value)
    }

    function onChangePasswordAgain(value) {
        setPasswordAgain(value)
    }

    function submitHandler(event) {
        event.preventDefault()
        if (password === passwordAgain) {
            addBook(title, password)
            console.log(title)
            console.log(password)
            console.log(passwordAgain)
        } else {
            console.log("Пароли отличаются")
        }
    }

    return (
        <div className="open__add">
            <div className="open__add-title title">Создание новой книги</div>

            <Form className="open__add-form" onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="book_title">
                    <Form.Label>Название книги</Form.Label>
                    <Form.Control className="open__add-input input form-control" type="text" onChange={(e) => onChangeTitle(e.target.value)} autoFocus />
                    <Form.Text className="text-muted">
                    Запишите название книги! Оно пригодится вам при открытии книги. Без него вы рискуете потерять доступ к записям. Название должно быть уникальным
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="book_password">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control className="open__add-input input form-control" type="text" onChange={(e) => onChangePassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="book_password_again">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control className="open__add-input input form-control" type="text" onChange={(e) => onChangePasswordAgain(e.target.value)} />
                </Form.Group>

                <button type="submit" className="open__add-submit button">Добавить</button>
            </Form>
            
            {/* <hr />

            <form className="open__add-form" onSubmit={submitHandler}>
                <div class>
                    <label>Название:</label>
                    <input className="open__add-input input form-control" type="text" onChange={(e) => onChangeTitle(e.target.value)} autoFocus />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input className="open__add-input input form-control" type="text" onChange={(e) => onChangePassword(e.target.value)} />
                </div>
                <div>
                    <label>Повторите пароль:</label>
                    <input className="open__add-input input form-control" type="text" onChange={(e) => onChangePassword(e.target.value)} />
                </div>
                
                <button type="submit">Добавить</button>
            </form> */}
        </div>
    )
}

export default AddBook