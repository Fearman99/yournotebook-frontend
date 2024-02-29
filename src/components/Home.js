import React from "react";
import Notes from "./Notes";
import Addnote from "./Addnote";

const Home = (props) => {
  const { showAlert } = props;

  return (
    <div >
      <Addnote showAlert={props.showAlert} />
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
