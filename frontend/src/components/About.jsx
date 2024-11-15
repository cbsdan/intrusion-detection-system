import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    const myFunction = () => {
      setTimeout(() => {
        document.getElementById("myDiv").style.display = "block";
        document.getElementById("loader").style.display = "none";
      }, 200);
    };
    myFunction();
  }, []);

  return (
    <div style={{ margin: 0 }}>
      {/* Loader */}
      <div id="loader"></div>

      {/* Main content */}
      <div id="myDiv" className="animate-bottom" style={{ display: "none" }}>
        {/* About section */}
        <div className="container-fluid">
          <section className="about-section py-2">
            <h1>About Our System</h1>
            <hr />
            <h5 className="text-start" style={{textAlign:"start"}}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Development of Intrusion Detection System (IDS), with
              Machine Learning and Deep Learning, Recurrent Neural Network
              models, MERN web I/O System.
            </h5>
            <br />
            <p className="text-white text-start" style={{textAlign:"start"}}>
              <p className="my-0">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Large numbers of businesses were affected by data infringes and
                Cyber-attacks due to dependency on the internet. To prevent such
                malicious activity, the network requires a system that detects
                anomalies and informs the user and alerts the user.
              </p>
              <br/>
              <p className="my-0">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This project detects Network Intrusion anomalies by using the
                NSL-KDD dataset. The deep learning model Long Short Term Memory
                (LSTM), a superior version of RNN (Recurrent Neural Network), and
                KNN (K-Nearest Neighbor) Algorithm are used for binary and
                multi-class classification.
              </p>
              <br/>
              <p className="my-0">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The user enters the hacking parameters in the front end, which is
                designed using ReactJS. The model predicts the type of attack and
                gives information about the type of attack to the user. MongoDB is
                used for storing the data, and NodeJS serves as the backend
                framework.
              </p>
            </p>
          </section>
        </div>

        {/* Team section */}
        <br />
        <br />
        <br />
        <h1 style={{ textAlign: "center" }} className="py-3">Our Team</h1>
        <div className="container-fluid">
          <div className="row d-flex align-items-center justify-content-center" style={{ color: "#fff" }}>
            {/* Team Member 1 */}
            <div
              className="card card-about text-center my-4"
              style={{
                width: "22rem",
                margin: "0px 30px 30px 30px",
                backgroundColor: "#71C9CE",
              }}
            >
              <img
                className="card-img-top p-4"
                src="./src/assets/images/default-profile.png"
                alt="image"
              />
              <div className="card-body">
                <h4 className="card-title">Daniel Cabasa</h4>
                <h6 className="card-title">Machine Learning, Backend</h6>
                <p className="card-text">Description</p>
                <div className="container-fluid">
                  <a
                    href="https://github.com/cbsdan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fab fa-github fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a
                    href="https://www.facebook.com/daniel.cabasa.14"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fab fa-facebook fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a
                    href="mailto:daniel.cabasa@tup.edu.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fas fa-envelope fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div
              className="card card-about text-center my-4"
              style={{
                width: "22rem",
                margin: "0px 30px 30px 30px",
                backgroundColor: "#71C9CE",
              }}
            >
              <img
                className="card-img-top p-4"
                src="./src/assets/images/default-profile.png"
                alt="image"
              />

              <div className="card-body">
                <h4 className="card-title">Cassley Esquivel</h4>
                <h6 className="card-title">Frontend</h6>
                <p className="card-text">Description</p>
                <div className="container-fluid">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fab fa-github fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fab fa-facebook fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a
                    href="mailto:gmail@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fas fa-envelope fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div
              className="card card-about text-center my-4"
              style={{
                width: "22rem",
                margin: "0px 30px 30px 30px",
                backgroundColor: "#71C9CE",
              }}
            >
              <img
                className="card-img-top p-4"
                src="./src/assets/images/default-profile.png"
                alt="image"
              />

              <div className="card-body">
                <h4 className="card-title">Juliana Mae Ines</h4>
                <h6 className="card-title">Frontend</h6>
                <p className="card-text">Description</p>
                <div className="container-fluid">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fab fa-github fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fab fa-facebook fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a
                    href="mailto:gmail@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fas fa-envelope fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 4 */}
            <div
              className="card card-about text-center my-4"
              style={{
                width: "22rem",
                margin: "0px 30px 30px 30px",
                backgroundColor: "#71C9CE",
              }}
            >
              <img
                className="card-img-top p-4"
                src="./src/assets/images/default-profile.png"
                alt="image"
              />

              <div className="card-body">
                <h4 className="card-title">Josh Ziemenn Tan</h4>
                <h6 className="card-title">Backend</h6>
                <p className="card-text">Description</p>
                <div className="container-fluid">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fab fa-github fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fab fa-facebook fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a
                    href="mailto:gmail@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fas fa-envelope fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Team Member 5 */}
            <div
              className="card card-about text-center my-4"
              style={{
                width: "22rem",
                margin: "0px 30px 30px 30px",
                backgroundColor: "#71C9CE",
              }}
            >
              <img
                className="card-img-top p-4"
                src="./src/assets/images/default-profile.png"
                alt="image"
              />

              <div className="card-body">
                <h4 className="card-title">Jhun Mark Obreros</h4>
                <h6 className="card-title">Back End</h6>
                <p className="card-text">Description</p>
                <div className="container-fluid">
                  <a
                    href="https://github.com/link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fab fa-github fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fab fa-facebook fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                  <a
                    href="mailto:gmail@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className="social-icon fas fa-envelope fa-2x"
                      style={{ color: "#fff" }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* Include Footer here */}
      </div>
    </div>
  );
}

export default About;
