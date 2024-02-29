import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../contexts/notes/noteContext";
import Noteitem from "./Noteitem";
import "./Notes.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const navigate = useNavigate();
  const { mode } = props;
  const host = "http://localhost:5000";
  

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
    if (!localStorage.getItem("authtoken")) {
      navigate("/login");
    } else {
      getAllNotes();
      fetchPinnedNotes();
    }
  }, []);

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
    fetchPinnedNotes();
  };

  const onDescriptionChange = (value) => {
    setNote((prevNote) => ({ ...prevNote, edescription: value }));
  };

  const onTagChange = (e) => {
    setNote((prevNote) => ({ ...prevNote, etag: e.target.value }));
  };

  const limitedNotes = notes.slice(0, 6);

  return (
    <>
      <div className="container">
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
                      onChange={(e) =>
                        setNote((prevNote) => ({
                          ...prevNote,
                          etitle: e.target.value,
                        }))
                      }
                      minLength={5}
                      required
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        marginTop: "8px",

                        transition: "border-color 0.3s",
                        whiteSpace: "pre-wrap",
                      }}
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
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link", "image"],
                          [{ indent: "-1" }, { indent: "+1" }], // Add indentation options
                          [{ align: [] }], // Add alignment options
                          [{ color: [] }, { background: [] }], // Add color and background color options
                          ["blockquote", "code-block"], // Add blockquote and code block options
                          [{ script: "sub" }, { script: "super" }], // Add subscript and superscript options
                          ["clean"], // Add option to remove formatting
                        ],
                      }}
                      placeholder="Enter description"
                      style={{
                        height: "150px",
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
                  ref={refClose}
                  data-bs-dismiss="modal"
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
        <h2
            style={{ fontWeight: "bold", textAlign: "center", padding: "25px" }}
          >
            Pinned Notes 📌
          </h2>
          {pinnedNotes.length > 0 ? (
            <div >
              {pinnedNotes.map((note) => (
                <div key={note._id}>
                  <Noteitem
                    key={note._id}
                    updateNote={updateNote}
                    note={note}
                    showAlert={props.showAlert}
                    mode={props.mode}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>Pin Your Notes Here .</p>
          )}
        </div>
        {notes.length > 6 && (
            <div className="text-center mt-3 my-4">
              <i
                class="fa-solid fa-angles-down "
                onClick={() => navigate("/pinned-notes")}
              ></i>
            </div>
          )}
        <div className="container">
          <h2
            style={{ fontWeight: "bold", textAlign: "center", padding: "25px" }}
          >
            Your Notes
          </h2>

          <div className="container mx-2">
            {notes.length === 0 && <p>Empty... 😓</p>}
          </div>

          <div className="row row-cols-1 row-cols">
            {limitedNotes.map((note) => (
              <Noteitem
                key={note._id}
                updateNote={updateNote}
                note={note}
                showAlert={props.showAlert}
                mode={props.mode}
              />
            ))}
          </div>
          {notes.length > 6 && (
            <div className="text-center mt-3">
              <i
                class="fa-solid fa-angles-down "
                onClick={() => navigate("/all-notes")}
              ></i>
            </div>
          )}
        </div>

        
        
      </div>
    </>
  );
};

export default Notes;