import React, {useState, useContext} from 'react'
import {Form} from 'react-bootstrap'
import { EnterIcon } from '../assets/SvgIcons'
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

    function enterPasswordPlaceholder() {
        if (currentBook) {
            return "Пароль для " + currentBook.title
        } else {
            return "Следуйте инструкции"
        }
    }


    return (
        <div className="open__pass">
            <Form onSubmit={submitHandler} className="open__pass-form">
                <Form.Group className="mb-3">
                    <Form.Control {...input.bind} type="password" placeholder={enterPasswordPlaceholder()} id="enter_password" className="input open__pass-input" autoFocus />
                    {!currentBook && <div>Список книг пуст. Создайте или найдите книгу используя кноки выше</div>}
                </Form.Group>

                <button  type="submit" className="open__pass-submit button">
                    {EnterIcon}
                </button>
            </Form>
        </div>
    )
}

export default EnterPassword