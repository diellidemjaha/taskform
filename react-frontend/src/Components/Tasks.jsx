import React from 'react';
import Navbar from './NavBar';

const Tasks = () => {
  return (
    <div>
        {/* <Navbar /> */}
    <div className="row row-cols-1 row-cols-md-5 g-2 m-3 p-4">
      <div className="col">
        <div className="card border-primary mb-3" style={{ maxWidth: '18rem' }}>
          <div className="card-header bg-primary text-light fw-bold">
            Task #01 <small className="text-body-light float-end">from: Admin</small>
          </div>
          <div className="card-body text-primary">
            <h5 className="card-title">Primary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <div className="container m-4 p-1 mx-auto">
              <div className="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar progress-bar-striped" style={{ width: '35%' }}></div>
              </div>
            </div>
            <button type="button" className="btn btn-outline-primary">
              Dielli
            </button>
            <button type="button" className="btn btn-outline-secondary">
              Hana
            </button>
            <button type="button" className="btn btn-outline-success">
              Bujar
            </button>
            <div className="d-inline-flex p-2">
              <small className="text-body-secondary">Start: 01/02/2023</small>
              <small className="text-body-secondary">Deadline: 10/02/2023</small>
            </div>
            <div className="d-inline-flex p-2">
              <small className="text-body-secondary">
                Catogories:
                <span className="badge text-bg-warning">Idea</span>
                <span className="badge text-bg-info">Cleaning</span>
                <span className="badge text-bg-secondary">Meeting</span>
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card border-secondary mb-3" style={{ maxWidth: '18rem' }}>
          <div className="card-header bg-secondary text-light fw-bold">
            Task #02 <small className="text-body-light float-end">from: Admin</small>
          </div>
          <div className="card-body text-secondary">
            <h5 className="card-title">Primary card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <div className="container m-4 p-1 mx-auto">
              <div className="progress" role="progressbar" aria-label="Secondary striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar progress-bar-striped" style={{ width: '40%' }}></div>
              </div>
            </div>
            <button type="button" className="btn btn-outline-primary">
              Dielli
            </button>
            <button type="button" className="btn btn-outline-secondary">
              Hana
            </button>
            <button type="button" className="btn btn-outline-success">
              Bujar
            </button>
            <div className="d-inline-flex p-2">
              <small className="text-body-secondary">Start: 01/02/2023</small>
              <small className="text-body-secondary">Deadline: 10/02/2023</small>
            </div>
            <div className="d-inline-flex p-2">
              <small className="text-body-secondary">
                Catogories:
                <span className="badge text-bg-warning">Idea</span>
                <span className="badge text-bg-info">Cleaning</span>
                <span className="badge text-bg-secondary">Meeting</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Tasks;
