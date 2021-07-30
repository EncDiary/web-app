import React, {useState} from 'react'
import PropTypes from 'prop-types'

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

function AddNote({onCreate}) {
    const input = useInputValue('')

    function submitHandler(event) {
        event.preventDefault()

        if (input.value().trim()) {
            onCreate(input.value())
            input.clear()
        }
    }

    return (
        <>
            <button type="button" className="btn btn-primary mb-3 mt-3" data-bs-toggle="modal" data-bs-target="#addModal">
            Добавить запись
            </button>

            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={submitHandler}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="addModalLabel">Добавление записи</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                
                                {/* <input {...input.bind} /> */}

                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Запись</label>
                                    <input {...input.bind} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Добавить запись</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>           
        </>
    )
}

AddNote.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddNote