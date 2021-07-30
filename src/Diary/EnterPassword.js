import React, {useState, useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
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

function EnterPassword() {
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
        <div>
            <Form className="col-4 offset-4" onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control {...input.bind} type="text" placeholder="Введите пароль" id="enter_password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default EnterPassword