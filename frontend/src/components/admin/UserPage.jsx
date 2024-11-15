import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { getToken } from "../../utils/helper";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./SideBar";

const UserPage = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Define columns for the user data
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "createdAt", headerName: "Date Created", flex: 1 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        };
        const response = await fetch(`${import.meta.env.VITE_API}/admin/all-users`, {
          headers: headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { users: data } = await response.json(); // Assuming the response returns an object with users
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
            id: item._id, // Assuming the ID is _id in the response
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            role: item.role,
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

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = rows.filter((row) => {
      return (
        row.id.toLowerCase().includes(query) ||
        row.firstName.toLowerCase().includes(query) ||
        row.lastName.toLowerCase().includes(query) ||
        row.email.toLowerCase().includes(query) ||
        row.role.toLowerCase().includes(query) ||
        row.createdAt.toLowerCase().includes(query)
      );
    });

    setFilteredRows(filtered); 
  };

  return (
    <>
      <SideBar isExpanded={isSidebarExpanded} onToggle={handleSidebarToggle} />
      <div
        className="table-container d-inline-flex flex-column"
        style={{
          maxHeight: "100vh",
          width: "90%",
          overflow: "auto !important",
          marginLeft: isSidebarExpanded ? "260px" : "100px",
          margin: "30px 30px 30px 100px",
          transition: "margin-left 0.3s ease",
          width: isSidebarExpanded ? "calc(100% - 320px)" : "calc(100% - 130px)",
        }}
      >
        <h3 className="table-title">Users</h3>
        
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
    </>
  );
};

export default UserPage;
