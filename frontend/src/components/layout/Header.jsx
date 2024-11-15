import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, isAdmin, logout } from "../../utils/helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const logoutHandler = () => {
    toast.success("Log out successfully"),
      {
        position: "bottom-right",
      };
    logout(navigate("/login"));
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <>
      <section className="colored-section" id="title">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <Link className="navbar-brand" to="/">
              Intrusion Detection System
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarTogglerDemo02"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Features
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/features">
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/attacks">
                        Attacks
                      </Link>
                    </li>
                    {isAdmin() && (
                      <li>
                        <Link className="dropdown-item" to="/stats">
                          Stats
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>

                {user && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ textDecoration: "none" }}
                      to="/predict"
                    >
                      Predict
                    </Link>
                  </li>
                )}

                {user && isAdmin() && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ textDecoration: "none" }}
                      to="/admin"
                    >
                      Admin
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                
                {user && (
                  <li className="nav-item">
                    <Link
                      className="nav-link text-danger"
                      style={{ textDecoration: "none" }}
                      to="/"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default Header;
