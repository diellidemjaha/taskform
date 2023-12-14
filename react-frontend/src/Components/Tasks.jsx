import Navbar from './NavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTaskModal from './EditTaskModal';

const mapStatusToLabel = (status) => {
  switch (status) {
    case 1:
      return 'In Progress';
    case 2:
      return 'Completed';
    case 3:
      return 'Canceled';
    default:
      return 'Unknown Status';
  }
};
const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [users , setUsers] = useState([])
  const statusColors = ['primary', 'warning', 'info', 'danger'];


  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleEditClick = (taskId) => {
    setSelectedTaskId(taskId);
    setShowEditModal(true);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks'); // Replace with your API endpoint
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);
  console.log('tasks', tasks)



  return (
    <div class="container">
      <div class="row">
        {tasks.map((task, index) => (
          <div key={task.id} className="col-sm-3 mt-5">
            <div className={`card border-${statusColors[index % statusColors.length]} mb-3`} style={{ maxWidth: '18rem' }}>
              <div className={`card-header bg-${statusColors[index % statusColors.length]} text-light fw-bold`}>
                {`Task #${task.id}`} <small className="text-body-light float-end">{`from: ${users?.find(el => el?.id == task?.admin_id)?.name}`}</small>
              </div>
              <div className={`card-body text-${statusColors[index % statusColors.length]}`}>
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-text">Deadline: {task.end_date}</p>
                <div className="container m-4 p-1 mx-auto">
                  <div className="progress" role="progressbar" aria-label="Secondary striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar progress-bar-striped" style={{ width: '40%' }}></div>
                  </div>
                 

                  {task?.users?.map(el => {
                    return (
                      <>
                        <div className="p-1">
                          <button type="button" className="btn btn-outline-primary p-1">
                            {el?.name}
                          </button>
                        </div>
                      </>
                    )
                  })}

                {task?.categories?.map(el => {
                    return (
                      <>
                        <div className="p-1">
                          {/* <button type="button" className="btn btn-outline-danger p-1"> */}
                          <span class="badge bg-secondary">{el?.name}</span>
                          {/* </button> */}
                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
              {/* <div className="d-flex justify-content-start p-2"> */}
              {/* </div> */}
              <div className="d-flex justify-content-end p-2 gap-2">
              {mapStatusToLabel(task?.status)}
              <button class="btn btn-primary" onClick={() => handleEditClick(task.id)}>Edit Task</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <Navbar /> */}
      {/* <div className="card border-primary mb-3" style={{ maxWidth: '18rem' }}>
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
          </div> */}
      {/* <div className="cards-alignment"> */}

        {/* <div className="col">
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
        </div> */}
        
         <EditTaskModal show={showEditModal} onHide={() => setShowEditModal(false)} taskId={selectedTaskId} />
      </div>
      
    // </div>
  );
};
export default Tasks;
