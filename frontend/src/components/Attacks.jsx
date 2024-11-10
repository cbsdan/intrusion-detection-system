import React from 'react';

const Attacks = () => {
  return (
    <section
      className="colored-section minHeight50vh d-flex align-items-center justify-content-center flex-column p-3 "
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
  );
};

export default Attacks;
