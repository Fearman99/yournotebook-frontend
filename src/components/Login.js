import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from 'framer-motion'

const Login = (props) => {
  const { mode } = props;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://yournotebook-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("authtoken", json.authtoken);
      navigate("/");
      props.showAlert("Successfully Logged In", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  const backgroundImageLight = "../leaves.jpg";
  const backgroundImageDark = "../leaves-dark.png"; 

  const backgroundImage = mode === "light" ? backgroundImageLight : backgroundImageDark;

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backgroundBlendMode: "overlay",
    opacity: 1,
    filter: "brightness(97%)",
    maxWidth: "400px",
    margin: "0 auto",
    animation: "fadeIn 0.5s ease-in-out",
    border: mode === "dark" ? "1px solid gray" : "none",
    transition: "background-image 0.5s ease-in-out",
    //  transition: "background-color 0.5s ease-in-out" 
  };
  

  return (
    <motion.div >
    <motion.div
      className="container my-3 login-container"
      style={containerStyle}
      initial={{ opacity: { duration: 0.1 }, scale: { duration: 0.1 } }}
      animate={{ opacity: [0, 1], scale: [0, 1] }}
      exit={{ opacity: { duration: 0.1 }, scale: { duration: 0.7 } }}
      transition={{ opacity: { duration: 0.1 }, scale: { duration: 0.5 } }}
    >
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="form-group" style={styles.inputGroup}>
          <label htmlFor="exampleInputEmail1" style={styles.label}>
            Email address
          </label>
          <input
            type="email"
            className="form-control my-2"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={credentials.email}
            onChange={onChange}
            style={styles.input}
          />
        </div>
        <div className="form-group" style={styles.inputGroup}>
          <label htmlFor="exampleInputPassword1" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            className="form-control my-2"
            name="password"
            id="exampleInputPassword1"
            placeholder="Password"
            value={credentials.password}
            onChange={onChange}
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary my-2"
          style={styles.button}
        >
          Submit
        </button>
      </form>
      <p style={{ textAlign: "center", padding: "8px" }}>
        Don't have an account?{" "}
        <Link
          to="/signup"
          style={{ color: "#6c757d", textDecoration: "none" }}
        >
          Create account
        </Link>
      </p>
    </motion.div>
    </motion.div>
  );
};

const styles = {
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "1.5 rem",
    animation: "flash 1.5s infinite",
    fontWeight: "bold",
  },
  form: {
    animation: "slideInUp 0.5s ease-in-out",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    transition: "border-color 0.3s ease-in-out",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    transition: "#007bff 0.3s ease",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;
