import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  return (
    <>
      <footer className="colored-section mt-3" id="footer">
        <div className="container-fluid">
          <a
            href="mailto:gmail@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="social-icon fas fa-envelope fa-2x"
              style={{ color: "#fff" }}
            />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="social-icon fab fa-github fa-2x"
              style={{ color: "#fff" }}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              className="social-icon fab fa-linkedin fa-2x"
              style={{ color: "#fff" }}
            />
          </a>

          <p>{new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
