import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./layout/Loader";
import { toast } from "react-toastify";

const Predict = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleFileUpload = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage("File is uploading...");
    const formData = new FormData(event.target);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/uploadjavatpoint`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "text/csv" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "updated_file.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setStatusMessage("File is uploaded and processed successfully!");
      setIsFileUploaded(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(`Error ${error.response?.statusText || error.message}`, {position: "bottom-right"})
      setStatusMessage(`Error: ${error.response?.statusText || error.message}`);
      setLoading(false);
    }
  };

  const handleRandomRowPredict = async () => {
    setLoading(true);
    setStatusMessage("Machine Learning is analyzing the random network traffic parameters...");

    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/secrets`);

      const dataToPass = {
        knn: response.data.knn,
        rf: response.data.rf,
        cnn: response.data.cnn,
        lstm: response.data.lstm,
      };

      navigate("/predict/param-secrets", { state: { data: dataToPass } });
      setLoading(false);
    } catch (error) {
      toast.error(`Error ${error.response?.data || error.message}`, {position: "bottom-right"})
      console.error("Error fetching data:", error);
      setStatusMessage("Error fetching prediction data.");
      setLoading(false);
    }
  };

  const handleFileSelect = () => {
    document.getElementById("predictButton").disabled = false;
  };

  const handlePredictionSubmit = () => {
    setTimeout(() => {
      document.getElementById("downloadButton").disabled = false;
    }, 10000);
  };

  return (
    <>
      {loading ? (
        <Loader message={statusMessage} />
      ) : (
        <div style={{ margin: 0 }}>
          <div id="loader" />
          <div id="myDiv" className="animate-bottom">
            <h1 className="my-0">Choose options to Predict</h1>
            {statusMessage ? (
              <h5 className="mt-3">
                <span className="text-warning">Status</span>: {statusMessage}
              </h5>
            ) : (
              <></>
            )}
            <div className="container-fluid d-flex align-items-center justify-content-center">
              <div className="row d-flex justify-content-center">
                <div
                  className="card text-center"
                  style={{
                    width: "23rem",
                    margin: "30px",
                    backgroundColor: "#71C9CE",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Enter Network Parameters</h5>
                    <p className="card-text">
                      It will take the network parameters from the user and
                      predict the type of attack.
                    </p>
                    <Link
                      to="/predict/parameter"
                      className="btn btn-dark"
                      style={{ backgroundColor: "#24a0ed" }}
                    >
                      Predict
                    </Link>
                  </div>
                </div>

                <div
                  className="card text-center"
                  style={{
                    width: "23rem",
                    margin: "30px",
                    backgroundColor: "#71C9CE",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">OPEN CSV</h5>
                    <p className="card-text">
                      It will take a CSV file of rows ranging from ( 1 ..500.. n
                      rows) and update the file with type of attack for each
                      row.
                    </p>
                    <form
                      id="uploadForm"
                      onSubmit={handleFileUpload}
                      encType="multipart/form-data"
                    >
                      <div className="textbox">
                        <select name="selected_model" required>
                          <option value="" disabled selected>
                            Select Algorithm
                          </option>
                          <option value="knn">KNN - 97%</option>
                          <option value="rf">RANDOM FOREST - 97%</option>
                          <option value="cnn">CNN - 95%</option>
                          <option value="lstm">LSTM - 95%</option>
                        </select>
                      </div>
                      <div>
                        <input
                          className="btn btn-dark"
                          style={{ backgroundColor: "#24a0ed" }}
                          type="file"
                          id="f1"
                          name="myfile"
                          accept=".csv,.txt"
                          onChange={handleFileSelect}
                          required
                        />
                      </div>
                      <br />
                      <input
                        id="predictButton"
                        className="btn btn-dark"
                        style={{ backgroundColor: "#24a0ed" }}
                        type="submit"
                        value="Predict"
                        name="submit"
                        onClick={handlePredictionSubmit}
                        disabled
                      />
                      <br />
                      <br />
                    </form>
                  </div>
                </div>

                <div
                  className="card text-center"
                  style={{
                    width: "23rem",
                    margin: "30px",
                    backgroundColor: "#71C9CE",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">RANDOM ROW PREDICT</h5>
                    <p className="card-text">
                      It will take a single row from validation data to predict
                      the type of attack.
                    </p>
                    <button
                      onClick={handleRandomRowPredict}
                      className="btn btn-dark"
                      style={{ backgroundColor: "#24a0ed" }}
                    >
                      Predict
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Predict;
