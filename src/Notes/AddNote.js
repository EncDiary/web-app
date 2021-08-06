import React, { useState, useContext } from 'react'
import Context from '../context';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';




import '../assets/styles/quill_custom_theme.scss'
import {Container, Col} from 'react-bootstrap'
import Button from '../Components/Button';

function AddNote() {
  const {addNote} = useContext(Context)

  const [body, setBody] = useState("")

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
    addNote(body)
    setBody("")
  }

  return (
    <>
      <section className="writer">
        <Container>
          <Col md={{ span: 8, offset: 2 }} >
            <ReactQuill onChange={handleChange}
                      value={body}
                      modules={modules}
                      formats={formats}
                      theme={null}
                      compatibilityMode={false}
                      className="writer__editor editor"
                      placeholder="Напишите здесь что-нибудь..." />
            <div className="editor__actions">
              <Button onClick={submitHandler} text="Сохранить" className="editor__button button-primary" />
            </div>
          </Col>
        </Container>
      </section>
    </>
  )
}


export default AddNote