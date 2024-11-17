import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const ParamSecrets = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const { data: resultData } = location.state || {};
  console.log(data);
  let navigate = useNavigate();

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  

  const extractInfo = (data) => {
    const extractBinaryClass = (bin_cls) => bin_cls.split(":")[1].trim();
    const extractMultiClass = (mul_cls) => mul_cls.split(":")[1].trim();
    const extractMultiClassDesc = (description) =>
      description.split(":")[1].trim();

    const result = {};

    for (const model in data) {
      if (data.hasOwnProperty(model)) {
        result[model] = {
          bin_cls: extractBinaryClass(data[model].bin_cls),
          mul_cls: capitalize(extractMultiClass(data[model].mul_cls)),
          description: extractMultiClassDesc(data[model].description),
        };
      }
    }

    return result;
  };

  // Redirect if no resultData
  useEffect(() => {
    if (!resultData) {
      navigate("/predict/parameters");
    } else {
      console.log(resultData);
      const extractedData = extractInfo(resultData);
      setData(extractedData);
    }
  }, [resultData, navigate]);

  // Show loading state while data is not yet available
  if (!data) return <div>Loading...</div>;

  return (
    <div className="container-fluid">
      <h1 className="my-4">Analysis Result</h1>
      <div
        className="row d-flex justify-content-center"
        style={{ color: "#fff" }}
      >
        {/* KNN Card */}
        <div
          className="card"
          style={{
            width: "35rem",
            margin: "0px 30px 30px 30px",
            backgroundColor: "#71C9CE",
          }}
        >
          <div className="card-body d-flex align-items-start flex-column">
            <h4 className="card-title w-100 text-center">
              K-Nearest-Neighbor (KNN)
            </h4>
            <div className=" mt-2">
              <h5>Binary Class Result</h5>
              <h3
                className={
                  data.knn.bin_cls == "Attack"
                    ? "text-danger d-flex align-items-center justify-content-center"
                    : "text-primary"
                }
              >
                {data.knn.bin_cls == "Attack" ? (
                  <i class="fa-solid fa-triangle-exclamation"></i>
                ) : (
                  <i class="fa-solid fa-shield"></i>
                )}
                <span className="px-2">{data.knn.bin_cls}</span>
              </h3>
            </div>
            <div className="card-text mt-2">
              <h5>Multi Class Result</h5>
              <h3
                className={
                  data.knn.mul_cls != "Normal" ? "text-warning" : "text-primary"
                }
              >
                {data.knn.mul_cls == "Normal" ? (
                  <i class="fa-solid fa-check"></i>
                ) : (
                  <i class="fa-solid fa-flag-checkered"></i>
                )}
                <span className="px-2">{data.knn.mul_cls}</span>
              </h3>
            </div>
            <div className="card-text mt-2" style={{ textAlign: "left" }}>
              <h5>Description</h5>
              <p className="text-secondary">
                &nbsp;&nbsp;&nbsp;&nbsp;{data.knn.description}
              </p>
            </div>
            <p className="card-text mt-2 mb-1">
              <span className="text-white">Binary Class Accuracy</span> ={" "}
              <span>0.9760368900303525</span>
            </p>
            <p className="card-text">
              <span className="text-white">Multi Class Accuracy</span> =
              <span>0.9740368900303525</span>
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
          className="card"
          style={{
            width: "35rem",
            margin: "0px 30px 30px 30px",
            backgroundColor: "#71C9CE",
          }}
        >
          <div className="card-body d-flex align-items-start flex-column">
            <h4 className="card-title w-100 text-center">Random Forest</h4>
            <div className=" mt-2">
              <h5>Binary Class Result</h5>
              <h3
                className={
                  data.rf.bin_cls == "Attack"
                    ? "text-danger d-flex align-items-center justify-content-center"
                    : "text-primary"
                }
              >
                {data.rf.bin_cls == "Attack" ? (
                  <i class="fa-solid fa-triangle-exclamation"></i>
                ) : (
                  <i class="fa-solid fa-shield"></i>
                )}
                <span className="px-2">{data.rf.bin_cls}</span>
              </h3>
            </div>
            <div className="card-text mt-2">
              <h5>Multi Class Result</h5>
              <h3
                className={
                  data.rf.mul_cls != "Normal" ? "text-warning" : "text-primary"
                }
              >
                {data.rf.mul_cls == "Normal" ? (
                  <i class="fa-solid fa-check"></i>
                ) : (
                  <i class="fa-solid fa-flag-checkered"></i>
                )}
                <span className="px-2">{data.rf.mul_cls}</span>
              </h3>
            </div>
            <div className="card-text mt-2" style={{ textAlign: "left" }}>
              <h5>Description</h5>
              <p className="text-secondary">
                &nbsp;&nbsp;&nbsp;&nbsp;{data.rf.description}
              </p>
            </div>
            <p className="card-text mt-2">
              <span className="text-white">Binary Class Accuracy</span> =
              <span>0.9760368900303525</span>
            </p>
            <p className="card-text">
              <span className="text-white">Multi Class Accuracy</span> =
              <span>0.9740368900303525</span>
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

        {/* CNN Card */}
        <div
          className="card"
          style={{
            width: "35rem",
            margin: "0px 30px 30px 30px",
            backgroundColor: "#71C9CE",
          }}
        >
          <div className="card-body d-flex align-items-start flex-column">
            <h4 className="card-title w-100 text-center">
              Convolutional Neural Network (CNN)
            </h4>
            <div className=" mt-2">
              <h5>Binary Class Result</h5>
              <h3
                className={
                  data.cnn.bin_cls == "Attack"
                    ? "text-danger d-flex align-items-center justify-content-center"
                    : "text-primary"
                }
              >
                {data.cnn.bin_cls == "Attack" ? (
                  <i class="fa-solid fa-triangle-exclamation"></i>
                ) : (
                  <i class="fa-solid fa-shield"></i>
                )}
                <span className="px-2">{data.cnn.bin_cls}</span>
              </h3>
            </div>
            <div className="card-text mt-2">
              <h5>Multi Class Result</h5>
              <h3
                className={
                  data.cnn.mul_cls != "Normal" ? "text-warning" : "text-primary"
                }
              >
                {data.cnn.mul_cls == "Normal" ? (
                  <i class="fa-solid fa-check"></i>
                ) : (
                  <i class="fa-solid fa-flag-checkered"></i>
                )}
                <span className="px-2">{data.cnn.mul_cls}</span>
              </h3>
            </div>
            <div className="card-text mt-2" style={{ textAlign: "left" }}>
              <h5>Description</h5>
              <p className="text-secondary">
                &nbsp;&nbsp;&nbsp;&nbsp;{data.cnn.description}
              </p>
            </div>
            <p className="card-text mt-2">
              <span className="text-white">Binary Class Accuracy</span> =
              <span>0.9760368900303525</span>
            </p>
            <p className="card-text">
              <span className="text-white">Multi Class Accuracy</span> =
              <span>0.9740368900303525</span>
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

        {/* LSTM Card */}
        <div
          className="card"
          style={{
            width: "35rem",
            margin: "0px 30px 30px 30px",
            backgroundColor: "#71C9CE",
          }}
        >
          <div className="card-body d-flex align-items-start flex-column">
            <h4 className="card-title w-100 text-center">
              Long Short Term Memory (LSTM){" "}
            </h4>
            <div className=" mt-2">
              <h5>Binary Class Result</h5>
              <h3
                className={
                  data.lstm.bin_cls == "Attack"
                    ? "text-danger d-flex align-items-center justify-content-center"
                    : "text-primary"
                }
              >
                {data.lstm.bin_cls == "Attack" ? (
                  <i class="fa-solid fa-triangle-exclamation"></i>
                ) : (
                  <i class="fa-solid fa-shield"></i>
                )}
                <span className="px-2">{data.lstm.bin_cls}</span>
              </h3>
            </div>
            <div className="card-text mt-2">
              <h5>Multi Class Result</h5>
              <h3
                className={
                  data.lstm.mul_cls != "Normal"
                    ? "text-warning"
                    : "text-primary"
                }
              >
                {data.lstm.mul_cls == "Normal" ? (
                  <i class="fa-solid fa-check"></i>
                ) : (
                  <i class="fa-solid fa-flag-checkered"></i>
                )}
                <span className="px-2">{data.lstm.mul_cls}</span>
              </h3>
            </div>
            <div className="card-text mt-2" style={{ textAlign: "left" }}>
              <h5>Description</h5>
              <p className="text-secondary">
                &nbsp;&nbsp;&nbsp;&nbsp;{data.lstm.description}
              </p>
            </div>
            <p className="card-text mt-2">
              <span className="text-white">Binary Class Accuracy</span> =
              <span>0.9760368900303525</span>
            </p>
            <p className="card-text">
              <span className="text-white">Multi Class Accuracy</span> =
              <span>0.9740368900303525</span>
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
      </div>

      <div className="login-box d-flex align-items-center justify-content-center flex-column my-4">
        <Link
          className="btn btn-success w-50"
          style={{ textAlign: "center" }}
          to="/predict"
          role="button"
        >
          Predict Again!
        </Link>
        <Link
          className="btn btn-primary w-50"
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
