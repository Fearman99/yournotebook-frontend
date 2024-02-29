import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css"; // Import CSS file for styling
import { motion } from "framer-motion";

const SignUp = (props) => {
  const { mode } = props;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    Cpassword: "", // Corrected the name attribute for confirm password field
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("authtoken", json.authtoken);
      navigate("/");
      props.showAlert("Account Successfully Created", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const lightModeImage = "../leaves.jpg";
  const darkModeImage = "../leaves-dark.png";
  const backgroundImage = mode === "light" ? lightModeImage : darkModeImage;

  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: { duration: 0.1 }, scale: { duration: 0.1 } }}
      animate={{ opacity: [0, 1], scale: [0, 1] }}
      exit={{ opacity: { duration: 0.1 }, scale: { duration: 0.7 } }}
      transition={{ opacity: { duration: 0.1 }, scale: { duration: 0.5 } }}
    >
      <div
        className="signup-form-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          border: mode === "dark" ? "1px solid gray" : "none",
          transition: "background-image 0.5s ease-in-out"
        }}
      >
        <h2 className="signup-heading">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              className="form-control my-2"
              name="name"
              id="exampleInputName1"
              placeholder="Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control my-2"
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control my-2"
              name="password"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputcnfPassword1">Confirm Password</label>
            <input
              type="password"
              className="form-control my-2"
              name="Cpassword"
              id="exampleInputCpassword1"
              placeholder="Confirm Password"
              onChange={onChange}
              required
              minLength={5}
            />
          </div>
          <button type="submit" className="btn btn-primary my-2 signup-btn">
            Submit
          </button>
        </form>
        <p style={{ textAlign: "center", padding: "8px" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#6c757d", textDecoration: "none" }}
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;
