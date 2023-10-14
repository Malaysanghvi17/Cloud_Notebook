import React, { useState } from 'react';
import Login from './Login';
import { addnote } from '../context/middleware'

export default function Home(props) {

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  
  const handleAddNote = () => {
    let authtoken = localStorage.getItem('token')
    console.log(authtoken, name, text, tag)
    addnote(authtoken, name, text, tag) //call this function from middleware.js for api request
      .then(() => {
        // Clear the input fields
        setText('');
        setName('');
        setTag('');
      })
      .catch((error) => {
        console.error('Form submission failed:', error);
      });
  };

  const onChangeHandler = (event) => {
    console.log('on change handler');

    if (event.target.id === 'noteName') {
      setName(event.target.value);
    } else if (event.target.id === 'noteText') {
      setText(event.target.value);
    } else if (event.target.id === 'noteTag') {
      setTag(event.target.value);
    }
  };

  return (
    <div>
      <br />
      <h1>{props.TextAreaName}</h1>
      <br />
      <br />
      <h2>Create and Save your notebook: </h2>
      <br />
      <div className="mb-3">
        <label htmlFor="noteName" className="form-label">Name of the note: </label>
        <textarea className="form-control" value={name} onChange={onChangeHandler} id="noteName" rows="1"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="noteText" className="form-label">Text: </label>
        <textarea className="form-control" value={text} onChange={onChangeHandler} id="noteText" rows="10"></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="noteTag" className="form-label">Tag: </label>
        <textarea className="form-control" value={tag} onChange={onChangeHandler} id="noteTag" rows="1"></textarea>
      </div>
      <button className="button1_analyse" onClick={handleAddNote}>{props.Button1_name}</button>
      <br />
      <br />
      <br />
    </div>
  );
}
