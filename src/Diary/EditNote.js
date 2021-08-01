import React, {useState, useContext} from 'react'
import {Modal} from 'react-bootstrap'
import Context from '../context'
import ReactQuill from 'react-quill'



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
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
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
                    placeholder="Напишите здесь что-нибудь" />
          
          <div className="editor__actions">
            <button onClick={submitHandler} className="editor__button editor__button-active button">Сохранить изменения</button>
            <button onClick={handleClose} className="editor__button button">Отмена</button>
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditNote