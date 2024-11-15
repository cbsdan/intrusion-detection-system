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

const getBinaryClassTypeData = async () => {
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
    console.log(counts);

    const labels = counts.map((item) => item.result);
    const values = counts.map((item) => item.count);

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
    return binaryClassTypeData;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "An error occurred", {
      position: "bottom-right",
    });
  }
};

// New function to fetch multi-class data
const getMultiClassTypeData = async () => {
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

    const labels = counts.map((item) => item.result);
    const values = counts.map((item) => item.count);

    const multiClassTypeData = {
      labels: labels,
      datasets: [
        {
          label: "Frequency",
          data: values,
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
    return multiClassTypeData;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "An error occurred", {
      position: "bottom-right",
    });
  }
};

const modelPrecisionData = {
  labels: ["KNN", "RANDOM FOREST", "CNN", "LSTM"],
  datasets: [
    {
      label: "Precision",
      data: [0.97, 0.99, 0.94, 0.94], // Replace with actual data from your database
      fill: false,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
  ],
};

function ChartsPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
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
  const [multiClassTypeData, setMultiClassTypeData] = useState({
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
    const multiData = await getMultiClassTypeData();
    if (multiData) {
      setMultiClassTypeData(multiData);
    }
  };

  useEffect(() => {
    fetchBinaryClassTypeData();
    fetchMultiClassTypeData();
  }, []);

  return (
    <>
      <SideBar isExpanded={isSidebarExpanded} onToggle={handleSidebarToggle} />
      <Container
        style={{
          marginLeft: isSidebarExpanded ? "260px" : "70px",
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: isSidebarExpanded ? "calc(100% - 260px)" : "calc(100% - 70px)",
          padding: "30px",
          maxWidth: "none",
        }}
      >
        <Typography variant="h4" gutterBottom className="py-3">
          Dashboard
        </Typography>
        <Grid container spacing={3} style={{ width: "70%" }}>
          <Grid item xs={12} md={6} lg={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
                Binary Class Type Values
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
          <Grid item xs={12} md={6} lg={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: "#000" }}>
                Multi Class Type Values
              </Typography>
              <Pie data={multiClassTypeData} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ChartsPage;
