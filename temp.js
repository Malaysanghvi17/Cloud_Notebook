import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const About = () => {
  const [notes, setNotes] = useState([]);
  const [showUpdateWindow, setShowUpdateWindow] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({});
  let authtoken = localStorage.getItem('token');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:7400/api/notes/fetchallnotes', {
          headers: {
            'auth-token': authtoken,
          },
        });
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteDelete = async (noteId) => {
    try {
      await axios.delete(`http://localhost:7400/api/notes/deletenote/${noteId}`, {
        headers: {
          'auth-token': authtoken,
        },
      });
      alert('Confirm, do you want to delete this notebook?');
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error(error);
    }
  };

  const openNoteUpdateWindow = (noteId) => {
    const note = notes.find((note) => note._id === noteId);
    if (note) {
      console.log(note)
      const { title, textdata, tag } = note;
      setUpdatedNote({
        noteId,
        title,
        description: textdata,
        tag,
      });
      setShowUpdateWindow(true);
    }
  };

  const handleNoteUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:7400/api/notes/updatenote/${updatedNote.noteId}`,
        {
          title: updatedNote.title,
          textdata: updatedNote.description,
          tag: updatedNote.tag,
        },
        {
          headers: {
            'auth-token': authtoken,
          },
        }
      );
      // Perform any necessary actions after updating the note
      setShowUpdateWindow(false);
      setUpdatedNote({});
    } catch (error) {
      console.error(error);
    }
  };
  

  if (!authtoken) {
    return (
      <div>
        <br />
        <br />
        <h2>Your Saved Notebooks</h2>
        <br />
        <br />
        <h4>Please login to see your saved notebooks!</h4>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div>
        <br />
        <br />
        <h2>Your Saved Notebooks</h2>
        <br />
        <br />
        <h4>
          It seems you do not have any saved notebooks. Create your first notebook
          on the cloud today!
        </h4>
      </div>
    );
  }

  return (
    <div>
      <br />
      <br />
      <h2>Your Saved Notebooks</h2>
      <br />
      {notes.map((note) => (
        <div key={note._id} className="note-box">
          <div>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </div>
          <div>
            <button onClick={() => openNoteUpdateWindow(note._id)}>Update</button>
            <button onClick={() => handleNoteDelete(note._id)}>Delete</button>
          </div>
          <br />
        </div>
      ))}
      {showUpdateWindow && (
        <div className="update-note-window">
          <h1>Update Note</h1>
          <br />
          <div className="update-note-form">
            <label htmlFor="noteName" className="form-label">
              Name of the note:
            </label>
            <textarea
              className="form-control"
              id="noteName"
              rows="1"
              value={updatedNote.title}
              onChange={(e) =>
                setUpdatedNote({ ...updatedNote, title: e.target.value })
              }
            ></textarea>
            <br />
            <label htmlFor="noteText" className="form-label">
              Text:
            </label>
            <textarea
              className="form-control"
              id="noteText"
              rows="10"
              value={updatedNote.description}
              onChange={(e) =>
                setUpdatedNote({ ...updatedNote, description: e.target.value })
              }
            ></textarea>
            <br />
            <label htmlFor="noteTag" className="form-label">
              Tag:
            </label>
            <textarea
              className="form-control"
              id="noteTag"
              rows="1"
              value={updatedNote.tag}
              onChange={(e) =>
                setUpdatedNote({ ...updatedNote, tag: e.target.value })
              }
            ></textarea>
            <br />
            <button className="button1_analyse" onClick={handleNoteUpdate}>
              Update
            </button>
            <br />
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
