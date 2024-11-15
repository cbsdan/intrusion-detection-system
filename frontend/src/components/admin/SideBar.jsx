import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../utils/helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideBar = ({ isExpanded, onToggle }) => {
  const logoutNotif = () => {
    toast.success("Logged out successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <aside id="sidebar" className={isExpanded ? "expand" : ""}>
        <div className="d-flex py-3">
          <button className="toggle-btn" type="button" onClick={onToggle}>
            <i className="lni lni-grid-alt"></i>
          </button>
          <div className="sidebar-logo">
            <h4 className="text-light sidebar-link">Admin</h4>
          </div>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/admin/dashboard" className="sidebar-link">
              <i className="lni lni-dashboard"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/admin/users" className="sidebar-link">
              <i className="lni lni-user"></i>
              <span>Users</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/admin/logs" className="sidebar-link">
              <i className="lni lni-agenda"></i>
              <span>Traffic Logs</span>
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link className="sidebar-link" to="/">
            <i className="lni lni-home text-primary"></i>
            <span>Home</span>
          </Link>
          <Link className="sidebar-link" to="/" onClick={()=>{logout(logoutNotif)}}>
            <i className="lni lni-exit text-danger"></i>
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
