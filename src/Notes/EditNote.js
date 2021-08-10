import React, {useState, useContext} from 'react'
import Context from '../context'
import ReactQuill from 'react-quill'
import { EditIcon } from '../assets/SvgIcons'
import Button from '../Components/Button'
import Title from '../Components/Title'



function EditNote({note}) {


  const {editNote} = useContext(Context)

  const [body, setBody] = useState(note.text)


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


      {
        show &&
        (
          <div className="modal-window editor">
            <div className="container">
              <div className="container-wrapper">
                <Title text="Редактирование записи" className="editor__title" />
                <div className="editor__close" onClick={handleClose}>&times;</div>
                <div>
                  <ReactQuill onChange={handleChange}
                          value={body}
                          modules={{}}
                          formats={['bold', 'italic', 'underline']}
                          theme={null}
                          compatibilityMode={false}
                          placeholder="Напишите здесь что-нибудь..." />
                
                  <div className="editor__actions">
                    <Button onClick={submitHandler} text="Сохранить изменения" className="editor__button" />
                    <Button onClick={handleClose} text="Отмена" className="editor__button" isPrimary={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </>
  );
}

export default EditNote