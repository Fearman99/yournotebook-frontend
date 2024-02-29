import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "https://yournotebook-backend.onrender.com"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //get all notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authtoken')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    //Logic
    setNotes(notes.concat(note));
    
  };

  //Delete Note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    console.log(json);

    //Logic
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //Edit Note
  const editNote = async ( id, title, tag, description ) => {
    console.log("Editing note on server:", { id, title, tag, description });
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authtoken')
      },
      body: JSON.stringify({ id,title,tag,description }),
    });
  
    const json = await response.json();
    console.log(json);
  
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  };
  

  // Function to pin/unpin a note
  const pinNote = async (id, pinned) => {
    // API Call
    const response = await fetch(`${host}/api/notes/pin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authtoken')
      },
      body: JSON.stringify({ pinned }),
    });
  
    const json = await response.json();
    console.log(json);
    // Logic to update pinned status in client
    let newNotes = [...notes];
    const index = newNotes.findIndex((note) => note._id === id);
    if (index !== -1) {
      newNotes[index] = { ...newNotes[index], pinned };
      setNotes(newNotes);
    }
  };

  const [ setPinnedNotes] = useState([]);
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
      console.error("Error fetching pinned notes:", error);
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes, pinNote,fetchPinnedNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};


export default NoteState;
