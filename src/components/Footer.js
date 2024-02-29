import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <div className="container text-center">
        <div className="row">
          <div className="col" style={{paddingBottom:"15px"}}>
            <a href="https://github.com/Fearman99/shivansh.git" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
          <div className="col" style={{paddingBottom:"15px"}}>
            <a href="https://www.linkedin.com/in/shivansh-tiwari-a05a57235" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <div className="col" style={{paddingBottom:"15px"}}>
            <a href="https://www.instagram.com/shivanshtiwari_7/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="col" style={{paddingBottom:"15px"}}>
            <a href="mailto:shivansh123tiwari@gmail.com">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
