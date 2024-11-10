import React, { useState, useEffect } from "react";
import LoadHead from "../layout/LoadHead";
import LoadFoot from "../layout/LoadFoot";
import { authenticate } from "../../utils/helper";
import axios from "axios"; 
import { toast } from "react-toastify";
import keyExist from '../../utils/keyExists'
function LoginPage() {
  const [data, setData] = useState({
    email: "", // Changed from username to email to match the state
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const url = `${import.meta.env.VITE_API}/login`;
      
      const { data: response } = await axios.post(url, data, config);
      console.log(response);
      authenticate(response, () => (window.location = "/"));
      setLoading(false);

      console.log(response.message);
    } catch (error) {
      const errorsFound = keyExist(error.response, "errors");
      if (errorsFound) {
        console.log(errorsFound)
      }
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        const message = error.response.data.message
        if (message){
          toast.error(message, {
            position: "bottom-right",
          });
        }
        if (
          error.response.data.errors &&
          Array.isArray(error.response.data.errors)
        ) {
          error.response.data.errors.forEach((error) => {
            toast.error(error, {
              position: "bottom-right",
            });
          });
        }

        setError(error.response.data.message);
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
      <body style={{ margin: 0 }}>
        <div id="loader"></div>

        <div style={{ display: "none" }} id="myDiv" className="animate-bottom">
          <div className="row">
            <div className="login-box">
              <h1>Login</h1>
              <form onSubmit={handleSubmit}> {/* Removed action and method */}
                <div className="textbox">
                  <i className="fas fa-user login-icons"></i>
                  <input
                    type="email"
                    placeholder="User-Name (Email)"
                    name="email" // Matching the state key
                    value={data.email} // Controlled component: bind value
                    onChange={handleChange} // Handle change to update the state
                    required
                  />
                </div>
                <div className="textbox">
                  <i className="fas fa-lock login-icons"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={data.password} // Controlled component: bind value
                    onChange={handleChange} // Handle change to update the state
                    required
                  />
                </div>
                <a
                  href="/register"
                  style={{ color: "white", float: "right", fontSize: "small" }}
                >
                  Don't have an account? Sign Up
                </a>
                <button type="submit" className="btn btn-success" disabled={loading}>
                  {loading ? "Logging in..." : "LOGIN"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </body>
      <LoadFoot />
    </div>
  );
}

export default LoginPage;
