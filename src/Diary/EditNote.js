import React, {useState, useContext} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
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





function EditNote({note}) {

  const {editNote} = useContext(Context)

  const input = useInputValue(note.text)

  function submitHandler(event) {
      event.preventDefault()

      if (input.value().trim()) {
          editNote(note.id, input.value())
      }
  }

  


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="fas fa-pencil-alt"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Форма редактирования</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="editFormText">
              <Form.Label>Запись</Form.Label>
              <Form.Control type="text" placeholder="Напишите вашу записку здесь" {...input.bind} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose} type="Submit">
              Save Changes
            </Button>
            
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EditNote