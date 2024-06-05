import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

  let hasToken = localStorage.getItem('token');

  const handleLogout = async (e) => {
    try {
      const response = await axios.post('http://localhost:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data.message);

        localStorage.clear()

        window.location.href = '/login';

      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <nav className="navbar navbar-expand-lg bg-secondary" style={{ backgroundColor: 'orangered' }}>
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="/">
          Task Form
        </a>
        <button
          className="navbar-toggler"
          style={{ color: 'white' }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/tasks">
                Tasks
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/new-task">
                New-Task
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Contact
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    About us
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Task Form v.1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Stack used for building Task Form v.1
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          {hasToken ? (
              <Link to="/logout"><button type="button" className="btn btn-outline-light me-2 float-end" onClick={() => handleLogout()}>Sign out</button></Link>
          
           ) : (
            <p> </p>
            )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
