import React, {useState, useEffect} from "react";
import { getUser } from "../utils/helper";
import { Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div>
      <section className="colored-section minHeight50vh" id="title">
        <div className="container-fluid">
          {/* Title */}
          <div className="row">
            <div className="col-12">
              <p className="fs-4">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Machine
                learning (ML) for intrusion detection focuses on automating the
                detection of malicious activities or security breaches in a
                network or system. By leveraging algorithms, ML models can
                analyze large volumes of network traffic, identify patterns, and
                classify data as normal or potentially harmful. These models can
                detect known attacks based on historical data and also identify
                previously unseen or novel threats through anomaly detection.
                The ability of ML to continuously learn from new data makes it a
                powerful tool in adaptive security, enabling systems to evolve
                and improve over time. Ultimately, ML-based intrusion detection
                systems (IDS) enhance security by providing real-time detection
                and minimizing human intervention.
              </p>
              {!user ? (
                <>
                  <div className="buttons row d-flex align-items-center justify-content-center flex-column flex-lg-row mt-5">
                    <Link
                      to="/login"
                      className="col-3 btn d-inline-flex mx-2 align-items-center justify-content-center px-2"
                    >
                      <i className="fa-solid fa-user"></i>
                      <span className="mx-2">Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="col-3 btn d-inline-flex mx-2 align-items-center justify-content-center px-2"
                    >
                      <i className="fa-solid fa-user-plus"></i>
                      <span className="mx-2">Register</span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="buttons row d-flex align-items-center justify-content-center flex-column flex-lg-row mt-5">
                    <Link
                      to="/predict"
                      className="col-3 btn d-inline-flex mx-2 align-items-center justify-content-center px-2"
                    >
                      <i className="fa-solid fa-globe"></i>
                      <span className="mx-2">Predict Network Traffic</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="white-section" id="features">
        <div className="container-fluid">
          <div className="row" style={{ color: "#393E46" }}>
            <div className="feature-box col-lg-4">
              <i className="icon fa-solid fa-clock fa-4x"></i>
              <h3 className="feature-title">Network Traffic Processing</h3>
              <p className="feature-desc">
                Convert the traffic into multiple network parameter patterns
                (Signatures)
              </p>
            </div>
            <div className="feature-box col-lg-4">
              <i className="icon fa-solid fa-brain fa-4x"></i>
              <h3 className="feature-title">Prevent System</h3>
              <p className="feature-desc">
                Prevent System acts based on the threat detected
              </p>
            </div>
            <div className="feature-box col-lg-4">
              <i className="icon fa-solid fa-masks-theater fa-4x"></i>
              <h3 className="feature-title">Threat Reporting</h3>
              <p className="feature-desc">Report/Log the threat</p>
            </div>
            <div className="feature-box col-lg-4">
              <i className="icon fa-sharp fa-solid fa-book-skull fa-4x"></i>
              <h3 className="feature-title">Threat Classification</h3>
              <p className="feature-desc">
                Classify the threat based on signature matching
              </p>
            </div>
            <div className="feature-box col-lg-4">
              <i className="icon fa-solid fa-users-rays fa-4x"></i>
              <h3 className="feature-title">Anomaly Detection</h3>
              <p className="feature-desc">
                Match the input network signature against already available
                normal traffic signature to detect zero-day attacks
              </p>
            </div>
            <div className="feature-box col-lg-4">
              <i className="icon fa-brands fa-searchengin fa-4x"></i>
              <h3 className="feature-title">Signature Matching</h3>
              <p className="feature-desc">
                Match the input signature against the already available threat
                signature patterns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="colored-section minHeight25vh d-flex align-items-center justify-content-center flex-column p-3"
        id="testimonials"
        style={{ backgroundColor: "#00ADB5" }}
      >
        <h1 className="my-3">Cyber Attacks</h1>
        <div
          id="testimonial-carousel"
          className="carousel slide w-100"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active container-fluid">
              <div className="card text-center">
                <div
                  className="card-body"
                  style={{ backgroundColor: "#71C9CE", border: "none" }}
                >
                  <h5 className="card-title">Denial of Service (DoS)</h5>
                  <p className="card-text">
                    A Denial-of-Service (DoS) attack is an attack meant to shut
                    down a machine or network...
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item container-fluid">
              <div className="card text-center">
                <div
                  className="card-body"
                  style={{ backgroundColor: "#71C9CE" }}
                >
                  <h5 className="card-title">Probe</h5>
                  <p className="card-text">
                    Probing is another type of attack in which the intruder
                    scans network devices...
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item container-fluid">
              <div className="card text-center">
                <div
                  className="card-body"
                  style={{ backgroundColor: "#71C9CE" }}
                >
                  <h5 className="card-title">Remote to Local</h5>
                  <p className="card-text">
                    Remote-to-local (R2L) attacks involve exploiting a
                    vulnerability in the network...
                  </p>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev mx-3"
            href="#testimonial-carousel"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next mx-3"
            href="#testimonial-carousel"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
