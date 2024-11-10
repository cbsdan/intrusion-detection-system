import React, { useState, useEffect } from "react";
import LoadHead from "../layout/LoadHead";
import LoadFoot from "../layout/LoadFoot";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const url = `${import.meta.env.VITE_API}/register`;

      const { data: res } = await axios.post(url, data, config);

      if (res.success) {
        toast.success(res.message, {
          position: "bottom-right",
        });
        navigate("/login");
      } else {
        setError(res.message);
      }
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        const { errors, message } = error.response.data;

        if (errors) {
          errors.forEach((err) => {
            toast.error(err, {
              position: "bottom-right",
            });
          });
        }

        setError(message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const myVar = setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("myDiv").style.display = "block";
    }, 200);

    return () => clearTimeout(myVar);
  }, []);

  return (
    <div>
      <LoadHead />
      <div style={{ margin: 0 }}>
        <div id="loader"></div>

        <div style={{ display: "none" }} id="myDiv" className="animate-bottom">
          <div className="row">
            <div className="login-box">
              <h1>Sign Up</h1>
              <form onSubmit={handleSubmit}>
                <div className="textbox">
                  <i className="fas fa-user login-icons"></i>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                    required
                    maxLength="30"
                  />
                </div>
                <div className="textbox">
                  <i className="fas fa-user login-icons"></i>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                    required
                    maxLength="30"
                  />
                </div>
                <div className="textbox">
                  <i className="fas fa-envelope login-icons"></i>
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="textbox">
                  <i className="fas fa-lock login-icons"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                    minLength="8"
                  />
                </div>
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "Signing Up..." : "SIGN UP"}
                </button>
              </form>
              {error && <div className="error-message">{error}</div>}
              <a
                href="/login"
                style={{ color: "white", float: "right", fontSize: "small" }}
              >
                Already have an account? Login
              </a>
            </div>
          </div>
        </div>
      </div>
      <LoadFoot />
    </div>
  );
}

export default Register;
