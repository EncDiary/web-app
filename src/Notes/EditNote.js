import React, {useState, useContext} from 'react'
import {Modal} from 'react-bootstrap'
import Context from '../context'
import ReactQuill from 'react-quill'
import { EditIcon } from '../assets/SvgIcons'
import Button from '../Components/Button'



function EditNote({note}) {


  const {editNote} = useContext(Context)

  const [body, setBody] = useState(note.text)

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline','strike']
    ],
  }
  
  const formats = [
    'bold', 'italic', 'underline', 'strike'
  ]

  function handleChange(value) {
    setBody(value)
  }

  function submitHandler() {
    console.log(body)
    editNote(note.id, body)
    handleClose()
  }



  


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="button note__button" onClick={handleShow}>
        {EditIcon}
      </button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Форма редактирования</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactQuill onChange={handleChange}
                    value={body}
                    modules={modules}
                    formats={formats}
                    theme={null}
                    compatibilityMode={false}
                    placeholder="Напишите здесь что-нибудь..." />
          
          <div className="editor__actions">
            <Button onClick={submitHandler} text="Сохранить изменения" className="editor__button button-primary" />
            <Button onClick={handleClose} text="Отмена" className="editor__button button-secondary" />
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditNote