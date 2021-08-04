import React, {useContext, useState} from 'react'
import Context from '../context'
import {Form} from 'react-bootstrap'

function FindBook() {
    const {findBook} = useContext(Context)
    const [title, setTitle] = useState("")

    function onChangeTitle(value) {
        setTitle(value)
    }

    function submitHandler(event) {
        event.preventDefault();
        
        findBook(title)
    }


    return (
        <div className="open__find">
            <div className="open__find-title title">Найти книгу</div>

            <Form className="open__find-form" onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="book_title">
                    <Form.Label>Название книги</Form.Label>
                    <Form.Control className="open__find-input input form-control" type="text" onChange={(e) => onChangeTitle(e.target.value)} autoFocus />
                </Form.Group>

                <button type="submit" className="open__find-submit button">Добавить</button>
            </Form>
        </div>
    )
}

export default FindBook