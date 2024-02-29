import React, { useContext, useState, useEffect } from "react";
import noteContext from "../contexts/notes/noteContext";
import { motion } from "framer-motion";
import "./Noteitem.css";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, pinNote, fetchPinnedNotes } = context;
  const { note, updateNote } = props;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pinned, setPinned] = useState(note.pinned || false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // Simulating a 2-second loading delay, adjust as needed
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = () => {
    deleteNote(note._id);
    props.showAlert("Delete Kar diya Bhai", "success");
  };

  const togglePin = async () => {
    setPinned(!pinned);
    await pinNote(note._id, !pinned);
    fetchPinnedNotes();
  };

  const handlePreview = () => {
    // Open a new window with the preview content
    console.log("handlePreview called");
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
        <head>
          <title>Note Preview</title>
          <link
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css" integrity="sha384-nU14brUcp6StFntEOOEBvcJm4huWjB0OcIeQ3fltAfSmuZFrkAif0T+UtNGlKKQv" crossorigin="anonymous">
          
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              background-color: #ffffe6; /* Yellow background */
              padding: 20px;
            }
            .preview-container {
              background-color: #fff;
              border: 1px solid #ccc;
              padding: 20px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease-in-out;
              max-width: 700px; /* Limit container width */
              margin: 0 auto; /* Center container */
            }
            .preview-container:hover {
              transform: translateY(-5px);
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            }
            .preview-title {
              border-bottom: 1px solid #999;
              padding-bottom: 5px;
              margin-bottom: 10px;
              word-wrap: break-word; /* Allow long titles to break into multiple lines */
            }
            .preview-description {
              margin-bottom: 10px;
              word-wrap: break-word; /* Allow long descriptions to break into multiple lines */
              white-space: pre-wrap;
            }
            strong {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="preview-container">
                  <h2 class="preview-title">${note.title}</h2>
                  <p class="preview-description">${note.description}</p>
                  <p><strong>Tag: </strong>${note.tag}</p>
                </div>
              </div>
            </div>
          </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
      <script src="https://kit.fontawesome.com/ab2b3b6155.js" crossorigin="anonymous"></script>
        </html>
      `);
    } else {
      // Handle error if window couldn't be opened
      console.error("Failed to open preview window.");
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
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

  const styles = {
    card: {
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    cardHeader: {
      padding: "15px",
    },
    cardTitle: {
      fontSize: "1.2rem",
      color: props.mode === "dark" ? "white" : "black",
    },
    cardBody: {
      overflowY: "auto",
      maxHeight: "200px",
    },
    cardText: {
      fontSize: "0.9rem",
    },
    cardFooter: {
      padding: "10px",
      justifyContent: "space-between",
    },
    icon: {
      fontSize: "1.2rem",
      transition: "all 0.3s ease-in-out",
      transform: "scale(1)",
      willChange: "transform",
      cursor: "pointer",
      padding: "7px",
    },
    tags: {
      marginTop: "4px",
    },
    tag: {
      display: "inline-block",
      backgroundColor: "#333",
      color: "#fff",
      padding: "4px 12px",
      borderRadius: "15px",
      marginRight: "5px",
      marginBottom: "4px",
      fontSize: "0.81rem",
    },
  };

  return (
    <motion.div
      className="col-sm-6 mb-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {!loading ? (
        <motion.div
          style={styles.card}
        >
          <motion.div style={styles.cardHeader} className="card-header">
            <motion.h5 style={styles.cardTitle} className="card-title">
              {showFullDescription ? note.title : note.title.slice(0, 100)}
              {note.title.length > 100 && !showFullDescription && (
                <span
                  onClick={() => setShowFullDescription(true)}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  ...
                </span>
              )}
            </motion.h5>
          </motion.div>
          <motion.div style={styles.cardBody} className="card-body">
            {note.description.includes("<img") ? (
              <div dangerouslySetInnerHTML={{ __html: note.description }} />
            ) : (
              <p
                style={{ ...styles.cardText, whiteSpace: "pre-wrap" }}
                className="card-text"
              >
                <motion.div style={{ padding: "15px" }} className="card-body">
                  <div style={styles}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: showFullDescription
                          ? note.description
                          : note.description.slice(0, 100),
                      }}
                    />
                    {note.description.length > 100 && !showFullDescription && (
                      <span
                        onClick={() => setShowFullDescription(true)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        ...
                      </span>
                    )}
                  </div>
                </motion.div>
              </p>
            )}
          </motion.div>
          <motion.div
            style={styles.cardFooter}
            className="card-footer d-flex align-items-center"
          >
            <div style={styles.tags} className="tags">
              <span style={styles.tag}>
                {<i className="fa-solid fa-tag"></i>} {note.tag}
              </span>
            </div>
            <div>
              {!showFullDescription && note.description && (
                <motion.i
                  onClick={() => setShowFullDescription(true)}
                  style={styles.icon}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="fa-solid fa-chevron-down"
                ></motion.i>
              )}
              {showFullDescription && note.description && (
                <motion.i
                  onClick={() => setShowFullDescription(false)}
                  style={styles.icon}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="fa-solid fa-chevron-up"
                ></motion.i>
              )}
              <motion.i
                style={styles.icon}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="far fa-trash-alt"
                onClick={handleDelete}
              ></motion.i>
              <motion.i
                style={styles.icon}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="far fa-edit"
                onClick={() => {
                  updateNote(note);
                }}
              ></motion.i>
              <motion.i
                style={styles.icon}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="far fa-eye"
                onClick={handlePreview}
              ></motion.i>
              <motion.i
                style={styles.icon}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fa-solid fa-thumbtack"
                onClick={togglePin}
              ></motion.i>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="card my-4 note-card">
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
            <a
              className="btn btn-primary disabled placeholder col-6"
              aria-disabled="true"
            ></a>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Noteitem;
