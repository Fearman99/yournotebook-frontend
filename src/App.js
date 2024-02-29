import "./App.css";
import React  from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
import AllNotes from './components/AllNotes';
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";
import NoteState from "./contexts/notes/noteState";
import PinnedNotes from "./components/PinnedNotes";



const App = () => {
  
  const [mode, setMode] = useState("light");
  const toggleModes = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
     document.body.style.color = "white";
     
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar mode={mode} toggleModes={toggleModes} />
        <Alert alert={alert} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home showAlert={showAlert} mode={mode}  />}
          ></Route>
          <Route
            exact
            path="/About"
            element={<About showAlert={showAlert} mode={mode} />}
          ></Route>
          <Route
            exact
            path="/signup"
            element={<SignUp showAlert={showAlert} mode={mode}  />}
          ></Route>
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} mode={mode} />}
          ></Route>
           <Route
            exact
            path="/all-notes"
            element={<AllNotes showAlert={showAlert} mode={mode} />}
          ></Route>
          <Route
            exact
            path="/pinned-notes"
            element={<PinnedNotes showAlert={showAlert} mode={mode} />}
          ></Route>
          
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
};

export default App;
