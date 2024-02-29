import React, { useContext, useState } from "react";
import noteContext from "../contexts/notes/noteContext";
import { motion} from "framer-motion";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./AddNote.css";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [file, setFile] = useState([]);
  const [isListening, setIsListening] = useState(false); // State to track speech recognition

  const onChange = (value) => {
    setNote({ ...note, description: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag, note.document);
    props.showAlert("Note added successfully!", "success");
    setNote({ title: "", description: "", tag: "" });
    setFile([]);
    console.log(file);
  };

  const handelCopy = () => {
    navigator.clipboard.writeText(note.description);
    props.showAlert("Text copied to clipboard", "success : ");
  };

  
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setIsListening(true);
  };

  
  const stopListening = () => {
    setNote({ ...note, description: transcript });
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };
  const handleFileChange = (e) => {
    setFile([...e.target.files]);
  };
  return (
    <>
    <motion.div
      className="containerkl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2
        style={{
          fontWeight: "bold",
          paddingTop: "30px",
          paddingBottom: "20px",
          textAlign: "center",
        }}
      >
        Add Note
      </h2>
      <motion.form className="my-3">
        <div className="mb-3 form-group">
          <label
            htmlFor="title"
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              marginTop: "8px",
              fontSize: "16px",
              transition: "border-color 0.3s",
              whiteSpace: "pre-wrap",
            }}
          />
        </div>
        <div className="mb-3 form-group">
          <label
            htmlFor="tag"
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter tag"
            value={note.tag}
            onChange={(e) => setNote({ ...note, tag: e.target.value })}
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              marginTop: "8px",
              fontSize: "16px",
              transition: "border-color 0.3s",
              whiteSpace: "pre-wrap",
            }}
          />
        </div>
        <div className="mb-3 form-group">
          <label
            htmlFor="description"
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "6px",
              
            }}
          >
            Description
          </label>

          <ReactQuill
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
            className="form-control"
            id="description"
            name="description"
            placeholder={isListening ? "Listening..." : "Enter description"}
            value={note.description}
            onChange={onChange}
            readOnly={isListening}
            style={{
              width: "100%",
              height: "250px",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              marginTop: "8px",

              transition: "border-color 0.3s",
              resize: "vertical",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          />

          <button
            type="button"
            className="btn btn-primary mx-2 my-2"
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? (
              <i class="fa-solid fa-pause"></i>
            ) : (
              <i class="fa-solid fa-play"></i>
            )}
          </button>
          <button
            type="button"
            className="btn btn-primary mx-2 my-2"
            aria-label="Copy to clipboard"
            data-bs-original-title="Copy to clipboard"
            onClick={handelCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-clipboard"
              viewBox="0 0 16 16"
            >
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
            </svg>
          </button>
        </div>
        <div className="mb-3 form-group">
          <label
            htmlFor="document"
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            Documents
          </label>
          <input
            type="file"
            className="form-control"
            id="document"
            name="document"
            placeholder=".pdf .docx"
            onChange={handleFileChange}
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              marginTop: "8px",
              fontSize: "16px",
              transition: "border-color 0.3s",
              resize: "vertical",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={note.title.length < 5 || note.description.length < 5}
          className="btn btn-primary"
          onClick={handleClick}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.3s",
            marginTop: "10px",
          }}
        >
          <span>Submit</span>
        </button>
      </motion.form>
    </motion.div>

  </>
  );
};

export default AddNote;
