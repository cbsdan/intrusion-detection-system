import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const ParamSecrets = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const { data: resultData } = location.state || {};
  console.log(data);
  let navigate = useNavigate();

  // Redirect if no resultData
  useEffect(() => {
    if (!resultData) {
      navigate("/predict/parameters");
    } else {
      setData(resultData);
    }
  }, [resultData, navigate]);

  // Show loading state while data is not yet available
  if (!data) return <div>Loading...</div>;

  return (
    <div className="container-fluid">
      <h1 className="my-4">Analysis Result</h1>
      <div
        className="row d-flex align-items-center justify-content-center"
        style={{ color: "#fff" }}
      >
        {/* KNN Card */}
        <div
          className="card text-center"
          style={{
            width: "35rem",
            margin: "0px 30px 30px 30px",
            backgroundColor: "#71C9CE",
          }}
        >
          <div className="card-body">
            <h4 className="card-title">K-Nearest-Neighbor (KNN)</h4>
            <p className="card-text">{data.knn.bin_cls}</p>
            <p className="card-text">{data.knn.mul_cls}</p>
            <p className="card-text">{data.knn.description}</p>
            <p className="card-text">
              KNN Binary Class Accuracy = 0.9760368900303525
            </p>
            <p className="card-text">
              KNN Multi Class Accuracy = 0.9740368900303525
            </p>
            <Link
              className="btn btn-success"
              style={{ textAlign: "center", backgroundColor: "#5bc0de" }}
              to="/knn_bin_table"
              role="button"
            >
              Binary-Class Classification Table
            </Link>
            <Link
              className="btn btn-success"
              style={{ textAlign: "center", backgroundColor: "#5bc0de" }}
              to="/knn_table"
              role="button"
            >
              Multi-Class Classification Table
            </Link>
          </div>
        </div>

        {/* Random Forest Card */}
        <div
          className="card text-center"
          style={{
            width: "35rem",
            margin: "0px 30px 30px 30px",
            backgroundColor: "#71C9CE",
          }}
        >
          <div className="card-body">
            <h4 className="card-title">Random Forest</h4>
            <p className="card-text">{data.rf.bin_cls}</p>
            <p className="card-text">{data.rf.mul_cls}</p>
            <p className="card-text">{data.rf.description}</p>
            <p className="card-text">
              Random Forest Binary Class Accuracy = 0.9741029652113005
            </p>
            <p className="card-text">
              Random Forest Multi Class Accuracy = 0.9731029652113005
            </p>
            <Link
              className="btn btn-success"
              style={{ textAlign: "center", backgroundColor: "#5bc0de" }}
              to="/rf_bin_table"
              role="button"
            >
              Binary-Class Classification Table
            </Link>
            <Link
              className="btn btn-success"
              style={{ textAlign: "center", backgroundColor: "#5bc0de" }}
              to="/rf_table"
              role="button"
            >
              Multi-Class Classification Table
            </Link>
          </div>
        </div>

        {/* CNN Card */}
        <div
          className="card text-center"
          style={{
            width: "35rem",
            margin: "0px 30px 30px 30px",
            backgroundColor: "#71C9CE",
          }}
        >
          <div className="card-body">
            <h4 className="card-title">Convolutional Neural Network (CNN)</h4>
            <p className="card-text">{data.cnn.bin_cls}</p>
            <p className="card-text">{data.cnn.mul_cls}</p>
            <p className="card-text">{data.cnn.description}</p>
            <p className="card-text">
              CNN Binary Class Accuracy = 0.9582535605883726
            </p>
            <p className="card-text">
              CNN Multi Class Accuracy = 0.9506420733130982
            </p>
            <Link
              className="btn btn-success"
              style={{ textAlign: "center", backgroundColor: "#5bc0de" }}
              to="/cnn_bin_table"
              role="button"
            >
              Binary-Class Classification Table
            </Link>
            <Link
              className="btn btn-success"
              style={{ textAlign: "center", backgroundColor: "#5bc0de" }}
              to="/cnn_table"
              role="button"
            >
              Multi-Class Classification Table
            </Link>
          </div>
        </div>

        {/* LSTM Card */}
        <div
          className="card text-center"
          style={{
            width: "35rem",
            margin: "0px 30px 30px 30px",
            backgroundColor: "#71C9CE",
          }}
        >
          <div className="card-body">
            <h4 className="card-title">Long Short Term Memory (LSTM)</h4>
            <p className="card-text">{data.lstm.bin_cls}</p>
            <p className="card-text">{data.lstm.mul_cls}</p>
            <p className="card-text">{data.lstm.description}</p>
            <p className="card-text">
              LSTM Binary Class Accuracy = 0.9562456222274107
            </p>
            <p className="card-text">
              LSTM Multi Class Accuracy = 0.9590940929255195
            </p>
            <Link
              className="btn btn-success"
              style={{ textAlign: "center", backgroundColor: "#5bc0de" }}
              to="/lstm_bin_table"
              role="button"
            >
              Binary-Class Classification Table
            </Link>
            <Link
              className="btn btn-success"
              style={{ textAlign: "center", backgroundColor: "#5bc0de" }}
              to="/lstm_table"
              role="button"
            >
              Multi-Class Classification Table
            </Link>
          </div>
        </div>
      </div>

      <div className="login-box d-flex align-items-center justify-content-center flex-column my-4">
        <Link
          className="btn btn-success w-25"
          style={{ textAlign: "center" }}
          to="/predict"
          role="button"
        >
          Predict Again!
        </Link>
        <Link
          className="btn btn-primary w-25"
          style={{ textAlign: "center", backgroundColor: "#dd4b39" }}
          to="/"
          role="button"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default ParamSecrets;
