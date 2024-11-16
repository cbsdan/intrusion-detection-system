import React, { useEffect, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import { Container, Grid, Paper, Typography } from "@mui/material";
import SideBar from "./SideBar";
import { getToken } from "../../utils/helper";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title
);
const ChartsPage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userCount, setUserCount] = useState(null);
  const [logCount, setLogCount] = useState(null);
  const [binaryClassTypeDataCounts, setBinaryClassTypeDataCounts] = useState({})

  const [binaryClassTypeData, setBinaryClassTypeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Frequency",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const [knnMultiClassTypeData, setKnnMultiClassTypeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Frequency",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [rfMultiClassTypeData, setRfMultiClassTypeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Frequency",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [cnnMultiClassTypeData, setCnnMultiClassTypeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Frequency",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [lstmMultiClassTypeData, setLstmMultiClassTypeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Frequency",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const getBinaryClassTypeData = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/binary-class-type-counts`,
        config
      );
      console.log(data);
      if (!data || !data.counts) {
        throw new Error("Invalid data structure");
      }
      const { counts } = data;
      setBinaryClassTypeDataCounts(counts)
      console.log(counts);

      const labels = ["normal", "attack"];
      const values = [counts.knn.normal, counts.knn.attack];

      const binaryClassTypeData = {
        labels: labels,
        datasets: [
          {
            label: "Frequency",
            data: values,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
            borderWidth: 1,
          },
        ],
      };
      setLoading(false);
      return binaryClassTypeData;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  const getMultiClassTypeData = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/multi-class-type-counts`,
        config
      );
      console.log(data);
      if (!data || !data.counts) {
        throw new Error("Invalid data structure");
      }

      const { counts } = data;
      console.log(counts);

      const labels = ['normal', "dos", "probe", "r2l", "u2r"];
      const knnValues = [counts?.knn.normal, counts?.knn.attack.dos, counts?.knn.attack.probe, counts?.knn.attack.r2l, counts?.knn.attack.u2r];
      const rfValues = [counts?.rf.normal, counts?.rf.attack.dos, counts?.rf.attack.probe, counts?.rf.attack.r2l, counts?.rf.attack.u2r];
      const cnnValues = [counts?.cnn.normal, counts?.cnn.attack.dos, counts?.cnn.attack.probe, counts?.cnn.attack.r2l, counts?.cnn.attack.u2r];
      const lstmValues = [counts?.lstm.normal, counts?.lstm.attack.dos, counts?.lstm.attack.probe, counts?.lstm.attack.r2l, counts?.lstm.attack.u2r];

      const knnMultiClassTypeData = {
        labels: labels,
        datasets: [
          {
            label: "Frequency",
            data: knnValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      const rfMultiClassTypeData = {
        labels: labels,
        datasets: [
          {
            label: "Frequency",
            data: rfValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      const cnnMultiClassTypeData = {
        labels: labels,
        datasets: [
          {
            label: "Frequency",
            data: cnnValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      const lstmMultiClassTypeData = {
        labels: labels,
        datasets: [
          {
            label: "Frequency",
            data: lstmValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
      setLoading(false);

      return {knnMultiClassTypeData, rfMultiClassTypeData, cnnMultiClassTypeData, lstmMultiClassTypeData};
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  const modelPrecisionData = {
    labels: ["KNN", "RANDOM FOREST", "CNN", "LSTM"],
    datasets: [
      {
        label: "Precision",
        data: [0.97, 0.97, 0.94, 0.94], // Replace with actual data from your database
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const fetchBinaryClassTypeData = async () => {
    const binaryData = await getBinaryClassTypeData();
    if (binaryData) {
      setBinaryClassTypeData(binaryData);
    }
  };

  const fetchMultiClassTypeData = async () => {
    const {knnMultiClassTypeData, rfMultiClassTypeData, cnnMultiClassTypeData, lstmMultiClassTypeData} = await getMultiClassTypeData();
    if (knnMultiClassTypeData) {
      setKnnMultiClassTypeData(knnMultiClassTypeData);
    }
    if (rfMultiClassTypeData) {
      setRfMultiClassTypeData(rfMultiClassTypeData);
    }
    if (cnnMultiClassTypeData) {
      setCnnMultiClassTypeData(cnnMultiClassTypeData);
    }
    if (lstmMultiClassTypeData) {
      setLstmMultiClassTypeData(lstmMultiClassTypeData);
    }
  };

  const fetchUserCount = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/admin/userCounts`,
        config
      );
      console.log(data);
      setUserCount(data.count);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const fetchLogCount = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/logs-count`,
        config
      );
      console.log(data);
      setLogCount(data.count);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCount();
    fetchLogCount();
    fetchBinaryClassTypeData();
    fetchMultiClassTypeData();
  }, []);

  return (
    <>
      <SideBar isExpanded={isSidebarExpanded} onToggle={handleSidebarToggle} />
      {loading ? (
        <Loader message="Loading" />
      ) : (
        <Container
          style={{
            marginLeft: isSidebarExpanded ? "260px" : "70px",
            transition: "margin-left 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: isSidebarExpanded
              ? "calc(100% - 260px)"
              : "calc(100% - 70px)",
            padding: "30px",
            maxWidth: "none",
          }}
        >
          <Typography variant="h4" gutterBottom className="py-3">
            Dashboard
          </Typography>
          <Grid container spacing={3} style={{ width: "90%" }}>
            <Grid item xs={4} md={4} lg={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <h4 className="text-dark">Users</h4>
                <h2 className="text-success fw-600">{userCount}</h2>
                <Link
                  to="/admin/users"
                  className="text-dark d-flex align-items-center justify-content-center"
                  style={{ textDecoration: "none" }}
                >
                  See more<span className="px-1"></span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </Paper>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <h4 className="text-dark">KNN Attacks Detected</h4>
                <h2 className="text-danger fw-600">{binaryClassTypeDataCounts?.knn?.attack}</h2>
                <Link
                  to="/admin/logs"
                  className="text-dark d-flex align-items-center justify-content-center"
                  style={{ textDecoration: "none" }}
                >
                  See more<span className="px-1"></span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </Paper>
            </Grid>
            <Grid item xs={4} md={4} lg={4}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <h4 className="text-dark">Network Traffic</h4>
                <h2 className="text-warning fw-600">{logCount}</h2>
                <Link
                  to="/admin/logs"
                  className="text-dark d-flex align-items-center justify-content-center"
                  style={{ textDecoration: "none" }}
                >
                  See more<span className="px-1"></span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
                  KNN Binary Class Type Values
                </Typography>
                <Bar data={binaryClassTypeData} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
                  Model Precision
                </Typography>
                <Line data={modelPrecisionData} />
              </Paper>
            </Grid>

            <h3 className="col-12 px-4 mt-5 text-start d-flex">Multi Class Type Data Values</h3>

            <Grid item xs={12} md={4} lg={3}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
                  KNN 
                </Typography>
                <Pie data={knnMultiClassTypeData} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
                  RF
                </Typography>
                <Pie data={rfMultiClassTypeData} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
                  CNN 
                </Typography>
                <Pie data={cnnMultiClassTypeData} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
                  LSTM 
                </Typography>
                <Pie data={lstmMultiClassTypeData} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ChartsPage;
