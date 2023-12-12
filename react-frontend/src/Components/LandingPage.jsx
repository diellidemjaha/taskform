// LandingPage.jsx
import React from 'react';
// import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container text-center mt-5">
        <h1>Welcome to Task Form</h1>
        <p className="lead">Organize your tasks easily with our Task tracker application.</p>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">New Task</h5>
                <p className="card-text">Sign in as admin to create a new task and assign it to users.</p>
                <Link to="/admin-login" className="btn btn-primary">
                  New Task
                </Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tasks</h5>
                <p className="card-text">Sign in as user and view and your tasks.</p>
                <Link to="/login" className="btn btn-primary">
                  Tasks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
