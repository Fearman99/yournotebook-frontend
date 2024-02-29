import React from "react";
import i1 from "../1.png";
import i2 from "../2.png";
import i3 from "../3.png";
import i4 from "../4.png";
import i5 from "../5.png";

import loveImage from "../flag.png";
import "./About.css"
import { motion } from "framer-motion";
import Footer from "./Footer";


const AboutPage = (props) => {
  const { mode } = props;
  let mystyle= {
    color : mode === "light" ? "black" : "white",
    backgroundColor : mode === "light" ? "white" : "black"
  }
  
  return (
    <motion.div
    
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
    <div className="container">
     
      <h1 className="text-center mb-4" style={{padding:"70px"}}>About YourNotes</h1>
      <div className="row mt-5"  style={{marginBottom:"160px"}}>
        <div className="col-md-6">
          <h2  h2 style={{ margin:"7%"}} className="mb-4">Why Choose YourNotes?</h2>
          <p style={{ margin:"7%"}} >
            YourNotes provides a user-friendly platform to store and organize
            your notes securely. With features like encryption and easy
            retrieval, it's the perfect solution for students, professionals,
            and anyone who needs to keep their notes organized.
          </p>
        </div>
        <div className="col-md-6">
           
            <img src={i1} alt="Image 1" controls className="img-fluid" />
            
        </div>
      </div>

      <div className="row mt-5" style={{marginBottom:"160px"}}>
        <div className="col-md-6 order-md-2">
          <h2 style={{ margin:"7%"}} className="mb-4">Why Choose YourNotes?</h2>
          <p style={{ margin:"7%"}} >
            YourNotes provides a user-friendly platform to store and organize
            your notes securely. With features like encryption and easy
            retrieval, it's the perfect solution for students, professionals,
            and anyone who needs to keep their notes organized.
          </p>
        </div>
        <div className="col-md-6 order-md-1 ">
           
        <img src={i2} controls className="img-fluid" />
            
        </div>
      </div>
      <div className="row mt-5"  style={{marginBottom:"160px"}}>
        <div className="col-md-6">
          <h2  h2 style={{ margin:"7%"}} className="mb-4">Queries</h2>
          <p style={{ margin:"7%"}} >
          YourNotes is a handy utility website where you can safely store
              your notes and showcase them for further use. If you have any
              queries, feel free to contact us.
          </p>
        </div>
        <div className="col-md-6">
           
        <img src={i3} alt="img" controls className="img-fluid" />
            
        </div>
      </div>
      <div className="row mt-5"  style={{marginBottom:"160px"}}>
        <div className="col-md-6 order-md-2">
          <h2  h2 style={{ margin:"7%"}} className="mb-4">About Us</h2>
          <p style={{ margin:"7%"}} >
          YourNotes is developed by Shivansh Tiwari, a 2nd-year student
              pursuing BTech in Computer Science at SRM Institute of Science and
              Technology. It is made with love in India.
          </p>
        </div>
        <div className="col-md-6 order-md-1 ">
           
        <img src={i4} alt="img" controls className="img-fluid" />
        </div>
        </div>
        <div className="row mt-5"  style={{marginBottom:"160px"}}>
        <div className="col-md-6">
          <h2  h2 style={{ margin:"7%"}} className="mb-4">Our Contact Info</h2>
          <p style={{ margin:"7%"}} >
            You can reach us through: <br />
            <b>Email:</b> shivansh123tiwari@gmail.com <br />
            <b>Phone:</b> +91 7607890012
          </p>
        </div>
        <div className="col-md-6">
           
        <img src={i5} alt="img" controls className="img-fluid" />
        </div>
      </div>
      <div className="row mt-5"  style={{marginBottom:"160px"}}>
        <div className="col-md-6 order-md-2">
          <h2  h2 style={{ margin:"7%"}} className="mb-4">Support</h2>
          <p style={{ margin:"7%"}} >
          <ul>
                <li>
                  <a
                    href="https://github.com/Fearman99/shivansh.git"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/shivansh-tiwari-a05a57235"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a
                  
                    href="https://www.instagram.com/shivanshtiwari_7/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>          
                    <li>
                  <a
                  
                  href="mailto:shivansh123tiwari@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                     <i className="fas fa-envelope"></i>
                  </a>
                </li>
                  
                
              </ul>
          </p>
        </div>
        <div className="col-md-6 order-md-1">
           
        <img src={i3} alt="img" controls className="img-fluid" />
        </div>
        </div>
        <br />
        <br />
      
      <div className="accordion" id="accordionExample">
        <div className="accordion-item" style={mystyle}>
          <h3 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              style={mystyle}
            >
              Queries
            </button>
          </h3>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              YourNotes is a handy utility website where you can safely store
              your notes and showcase them for further use. If you have any
              queries, feel free to contact us.
            </div>
          </div>
        </div>

        <div className="accordion-item"  style={mystyle}>
          <h3 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={mystyle}
            >
              About Us
            </button>
          </h3>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              YourNotes is developed by Shivansh Tiwari, a 2nd-year student
              pursuing BTech in Computer Science at SRM Institute of Science and
              Technology. It is made with love in India.
            </div>
          </div>
        </div>

        <div className="accordion-item"  style={mystyle}>
          <h3 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              style={mystyle}
            >
              Our Contact Info
            </button>
          </h3>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <span>
                Email: <a href="shivansh123tiwari@gmail.com">shivansh123tiwari@gmail.com</a><br />
                Phone: <a href="+917607890012">+917607890012</a>
              </span>
            </div>
          </div>
        </div>

        <div className="accordion-item"  style={mystyle}>
          <h3 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
              style={mystyle}
            >
              Author's Contact Links
            </button>
          </h3>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  <a
                    href="https://github.com/shivanshtiwari7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/shivanshtiwari7/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/shivanshtiwari_7/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-5">
        <h5>Made with ❤️</h5>
         
          <img src={loveImage} alt="Made with Love" className="imgs-fluid" style={{ 
    width: "20px",
    height: "20px",
  }} />
          
      </div>
    </div>
    <Footer/>
    </motion.div>
  );
};


export default AboutPage;
