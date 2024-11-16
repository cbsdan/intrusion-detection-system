import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toast, ToastContainer } from "react-toastify";
import { getToken } from "../../utils/helper";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./SideBar";
import Loader from "../layout/Loader";

const LogsTable = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "protocolType", headerName: "Protocol Type", flex: 0.5 },
    { field: "service", headerName: "Services", flex: 0.5 },
    { field: "flag", headerName: "Flag", flex: 0.5 },
    { field: "knn_result", headerName: "KNN Result", flex: 1 },
    { field: "rf_result", headerName: "RF Result", flex: 1 },
    { field: "cnn_result", headerName: "CNN Result", flex: 1 },
    { field: "lstm_result", headerName: "LSTM Result", flex: 1 },
    { field: "user", headerName: "User (Email)", flex: 1 },
    { field: "createdAt", headerName: "Date Created", flex: 1 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const headers = {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        };
        const response = await fetch(`${import.meta.env.VITE_API}/logs-all`, {
          headers: headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { logs: data } = await response.json();
        console.log(data);

        const mappedRows = data.map((item) => {
          const createdAt = new Date(item.createdAt).toLocaleString("en-US", {
            hour12: false, // Use 24-hour format
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });

          return {
            id: item._id,
            protocolType: item.networkTraffic.protocol_type,
            service: item.networkTraffic.service,
            flag: item.networkTraffic.flag,
            knn_result: `${
              item.binaryClassResult.find((bin) => bin.modelUsed === "knn")
                ? item.binaryClassResult.find((bin) => bin.modelUsed === "knn")
                    .result
                : "N/A"
            },
              ${
                item.multiClassResult.find((mul) => mul.modelUsed === "knn")
                  ? item.multiClassResult.find((mul) => mul.modelUsed === "knn")
                      .result
                  : "N/A"
              }`,
            rf_result: `${
              item.binaryClassResult.find((bin) => bin.modelUsed === "rf")
                ? item.binaryClassResult.find((bin) => bin.modelUsed === "rf")
                    .result
                : "N/A"
            },
              ${
                item.multiClassResult.find((mul) => mul.modelUsed === "rf")
                  ? item.multiClassResult.find((mul) => mul.modelUsed === "rf")
                      .result
                  : "N/A"
              }`,
            cnn_result: `${
              item.binaryClassResult.find((bin) => bin.modelUsed === "cnn")
                ? item.binaryClassResult.find((bin) => bin.modelUsed === "cnn")
                    .result
                : "N/A"
            },
              ${
                item.multiClassResult.find((mul) => mul.modelUsed === "cnn")
                  ? item.multiClassResult.find((mul) => mul.modelUsed === "cnn")
                      .result
                  : "N/A"
              }`,
            lstm_result: `${
              item.binaryClassResult.find((bin) => bin.modelUsed === "lstm")
                ? item.binaryClassResult.find((bin) => bin.modelUsed === "lstm")
                    .result
                : "N/A"
            },
              ${
                item.multiClassResult.find((mul) => mul.modelUsed === "lstm")
                  ? item.multiClassResult.find((mul) => mul.modelUsed === "lstm")
                      .result
                  : "N/A"
              }`,
            user: item.networkTraffic.user
              ? item.networkTraffic.user.email
              : "N/A",
            createdAt,
          };
        });

        setRows(mappedRows);
        setFilteredRows(mappedRows); // Set filteredRows initially to all rows
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);

        toast.error(error.message, {
          position: "bottom-right",
        });

        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search query change and filter rows
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = rows.filter((row) => {
      // Search across all the fields in a row (id, protocolType, service, etc.)
      return (
        row.id.toLowerCase().includes(query) ||
        row.protocolType.toLowerCase().includes(query) ||
        row.service.toLowerCase().includes(query) ||
        row.flag.toLowerCase().includes(query) ||
        row.knn_result.toLowerCase().includes(query) ||
        row.rf_result.toLowerCase().includes(query) ||
        row.user.toLowerCase().includes(query) ||
        row.createdAt.toLowerCase().includes(query)
      );
    });

    setFilteredRows(filtered); // Set filtered rows
  };

  return (
    <>
      <SideBar isExpanded={isSidebarExpanded} onToggle={handleSidebarToggle} />
      {
        loading ? (
          <Loader message="Loading"/>
        ) : (
          <div
            className="table-container d-inline-flex flex-column "
            style={{
              maxHeight: "100vh",
              overflow: "auto !important",
              marginLeft: isSidebarExpanded ? "260px" : "100px",          
              margin: "30px 30px 30px 100px",
              transition: "margin-left 0.3s ease",
              width: isSidebarExpanded ? "calc(100% - 320px)" : "calc(100% - 130px)",
            }}
          >
            <h3 className="table-title">Network Traffic Logs</h3>
            
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              style={{
                marginBottom: "20px",
                padding: "8px",
                width: "300px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            
            <DataGrid
              rows={filteredRows}  
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              loading={loading}
              style={{ overflow: "auto !important" }}
            />
          </div>
        )
      }
    </>
  );
};

export default LogsTable;
