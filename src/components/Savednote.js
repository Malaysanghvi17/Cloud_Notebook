import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchallnotes, updatenote, deletenote } from '../context/middleware';

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
    const deleteConfirmed = await deletenote(authtoken, noteId);

    if (deleteConfirmed) {
      alert('Success, note deleted!');
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } else {
      alert('Delete operation cancelled!');
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
      // console.log(title + textdata + tag)
      setShowUpdateWindow(true);
    }
  };

  const handleNoteUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:7400/api/notes/updatenote/${updatedNote.noteId}`,
        {
          title: updatedNote.title,
          description: updatedNote.description,
          tag: updatedNote.tag,
        },
        {
          headers: {
            'auth-token': authtoken,
          },
        }
      );

      console.log(updatedNote.title + updatedNote.description + updatedNote.tag)
      // Perform any necessary actions after updating the note
      setShowUpdateWindow(false);
      setUpdatedNote({});
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const noteBoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '10px',
    padding: '10px',
    backgroundColor: 'lightgray',
    marginBottom: '10px',
    marginLeft: '100px',
    marginRight: '80px'
  };

  const searchbarstyle = {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '10px',
    padding: '10px',
    marginTop: '1px',
    marginBottom: '10px',
    marginLeft: '900px',
    marginRight: '80px'
  }

  const noteContentStyle = {
    flex: 1,
  };

  const noteActionsStyle = {
    marginLeft: '10px',
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
        <form class="form-inline" style={searchbarstyle}>
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      <br />
      {notes.map((note) => (
        <div key={note._id} style={noteBoxStyle}>
          <div style={noteContentStyle}>
            <h3>{note.title}</h3>
            <p>{note.textdata}</p>
            <h6># {note.tag}</h6>
          </div>
          <div style={noteActionsStyle}>
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
