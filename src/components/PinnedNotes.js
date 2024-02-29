import React, { useContext, useEffect, useState,useRef} from 'react';
import noteContext from '../contexts/notes/noteContext';
import Noteitem from './Noteitem';
import "./AllNotes.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const PinnedNotes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
 
  
  
  const host = "https://yournotebook-backend.onrender.com";

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.etag, note.edescription);
    refClose.current.click();
    props.showAlert("Update Ho gaya bhai", "success");
  };
  


  const onDescriptionChange = (value) => {
    setNote(prevNote => ({ ...prevNote, edescription: value }));
  };

  const onTagChange = (e) => {
    setNote(prevNote => ({ ...prevNote, etag: e.target.value }));
  };

  

  const [searchTerm, setSearchTerm] = useState('');


  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [pinnedNotes, setPinnedNotes] = useState([]);
  // Function to fetch pinned notes
  const fetchPinnedNotes = async () => {
    try {
      
      const response = await fetch(`${host}/api/notes/fetchpinnednotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('authtoken')
        },
      });
      const pinnedNotesData = await response.json();
    setPinnedNotes(pinnedNotesData);
  } catch (error) {
    console.error("Error adding note:", error);
    props.showAlert("Failed to add note. Please try again.", "danger");
  }
  };

  useEffect(() => {
      getAllNotes();
      fetchPinnedNotes();
  });


  return (
    <div>
      
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        ></button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note ✏️
                </h5>
                <button
                  ref={refClose}
                  type="button"
                  className="btn-close d-none"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={(e) => setNote(prevNote => ({ ...prevNote, etitle: e.target.value }))}
                      style={{
                        
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        marginTop: "8px",
                        
                        transition: "border-color 0.3s",
                        whiteSpace: "pre-wrap",
                      }}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <ReactQuill
                      value={note.edescription}
                      onChange={onDescriptionChange}
                      modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'], 
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
                            ['link', 'image'],
                            [{ 'indent': '-1'}, { 'indent': '+1' }], // Add indentation options
                            [{ 'align': [] }], // Add alignment options
                            [{ 'color': [] }, { 'background': [] }], // Add color and background color options
                            ['blockquote', 'code-block'], // Add blockquote and code block options
                            [{ 'script': 'sub'}, { 'script': 'super' }], // Add subscript and superscript options
                            ['clean'] // Add option to remove formatting
                        ]
                    }}
                      placeholder="Enter description"
                      style={{
                        
                        height:"150px",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        marginTop: "8px",
                       
                        transition: "border-color 0.3s",
                        resize: "vertical",
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onTagChange}
                      style={{
                        
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        marginTop: "8px",
                        
                        transition: "border-color 0.3s",
                        whiteSpace: "pre-wrap",
                      }}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
          
                  className="btn btn-primary"
                  disabled={note.etitle.length < 5}
                  onClick={handleClick}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

    <div className="container">
      <h2 style={{  textAlign: 'center', padding: '25px' }}>
        Pinned Notes 📌
      </h2>
      <div className="container mx-2 ">
      <input
  type="text"
  placeholder="Search by title..."
  className={`form-control mb-5 searchbar ${props.mode === 'dark' ? 'dark' : ''}`}
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
      </div>
      <div>
  {pinnedNotes.length > 0 ? (
    <div>
      {pinnedNotes
        .filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(filteredNote => (
          <div key={filteredNote._id}>
            <Noteitem
              key={filteredNote._id}
              updateNote={updateNote}
              note={filteredNote}
              showAlert={props.showAlert}
              
            />
          </div>
        ))}
    </div>
  ) : (
    <p>No pinned notes found.</p>
  )}
</div>
</div>
</div>
  
  );
};

export default PinnedNotes;
