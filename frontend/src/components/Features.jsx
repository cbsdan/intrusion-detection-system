import React, { useEffect } from 'react';

const Features = () => {
  useEffect(() => {
    const myFunction = () => {
      setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('myDiv').style.display = 'block';
      }, 200);
    };
    myFunction();
  }, []);

  return (
    <>
      <div id="loader"></div>
      <div style={{ display: 'none' }} id="myDiv" className="animate-bottom">
        <section className="white-section" id="features">
          <div className="container-fluid">
            <div className="row" style={{ color: '#393E46' }}>
              <div className="feature-box col-lg-4">
                <i className="icon fa-solid fa-clock fa-4x"></i>
                <h3 className="feature-title">Network Traffic Processing</h3>
                <p className="feature-desc">Convert the traffic into multiple network parameter patterns (Signatures)</p>
              </div>
              <div className="feature-box col-lg-4">
                <i className="icon fa-solid fa-brain fa-4x"></i>
                <h3 className="feature-title">Prevent System</h3>
                <p className="feature-desc">Prevent System acts based on the threat detected</p>
              </div>
              <div className="feature-box col-lg-4">
                <i className="icon fa-solid fa-masks-theater fa-4x"></i>
                <h3 className="feature-title">Threat Reporting</h3>
                <p className="feature-desc">Report/Log the threat</p>
              </div>
              <div className="feature-box col-lg-4">
                <i className="icon fa-sharp fa-solid fa-book-skull fa-4x"></i>
                <h3 className="feature-title">Threat Classification</h3>
                <p className="feature-desc">Classify the threat based on signature matching</p>
              </div>
              <div className="feature-box col-lg-4">
                <i className="icon fa-solid fa-users-rays fa-4x"></i>
                <h3 className="feature-title">Anomaly Detection</h3>
                <p className="feature-desc">Match the input network signature against already available normal traffic signature to detect the zero-day attacks</p>
              </div>
              <div className="feature-box col-lg-4">
                <i className="icon fa-brands fa-searchengin fa-4x"></i>
                <h3 className="feature-title">Signature Matching</h3>
                <p className="feature-desc">Match the input signature against the already available threat signature patterns</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
