import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar(props) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let authtoken = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          'http://localhost:7400/api/auth/getuser',
          {},
          {
            headers: {
              'auth-token': authtoken,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (authtoken) {
      fetchUser();
    }
  }, [authtoken]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {props.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link home" aria-current="page" href="/">
                {props.name1}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link savednote" href="/saved">
                {props.name2}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link about" href="/about">
                {props.name3}
              </a>
            </li>
            
          </ul>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle me-md-2"
                  type="button"
                  id="loginDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-fill me-1"></i> {user.name}
                </button>
                <ul className="dropdown-menu" aria-labelledby="loginDropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <button
                  className="btn btn-primary me-md-2"
                  type="button"
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    window.location.href = '/signup';
                  }}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
