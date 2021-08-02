import React, {useState, useContext} from 'react'
import {Form} from 'react-bootstrap'
import Context from '../context'


function useInputValue(defaultValue='') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function EnterPassword({currentBook}) {
    const {enterPassword} = useContext(Context)

    const input = useInputValue('')

    function submitHandler(event) {
        event.preventDefault()

        if (input.value().trim()) {
            enterPassword(input.value())
            input.clear()
        }
    }

    return (
        <section className="decryption">
            <h1>Вход в {currentBook.title}</h1>
            <Form onSubmit={submitHandler} className="decryption__form">
                <Form.Group className="mb-3">
                    <Form.Control {...input.bind} type="password" placeholder="Введите пароль" id="enter_password" className="input decryption__input" autoFocus />
                </Form.Group>

                <button  type="submit" className="decryption__submit button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-corner-down-left"><polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>
                </button>
            </Form>
        </section>
    )
}

export default EnterPassword