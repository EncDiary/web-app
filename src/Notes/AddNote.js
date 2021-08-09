import React, { useState, useContext } from 'react'
import Context from '../context';
import ReactQuill from 'react-quill';




import '../assets/styles/quill_custom_theme.scss'
import {Container} from 'react-bootstrap'
import Button from '../Components/Button';
import { GoDownIcon } from '../assets/SvgIcons';

function AddNote({scrollToNotes}) {
  const {addNote} = useContext(Context)

  const [body, setBody] = useState("")
 

  function handleChange(value) {
    setBody(value)
  }

  function submitHandler() {
    console.log(body)
    addNote(body)
    setBody("")
  }

  return (
    <>
      <section className="writer">
        <Container>
          <div className="container-wrapper writer__wrapper">
            <ReactQuill onChange={handleChange}
                      value={body}
                      modules={{}}
                      formats={['bold', 'italic', 'underline']}
                      theme={null}
                      compatibilityMode={false}
                      placeholder="Напишите здесь что-нибудь..." />
            <div className="editor__actions">
              <Button onClick={submitHandler} text="Сохранить" className="editor__button button" />
            </div>
            <div className="writer__go-down-icon" onClick={scrollToNotes}>{GoDownIcon}</div>
          </div>
        </Container>
      </section>
    </>
  )
}


export default AddNote