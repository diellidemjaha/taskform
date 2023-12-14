import Navbar from './NavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTaskModal from './EditTaskModal';
import ProgressBar from './ProgressBar'; // Import the ProgressBar component

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
  const [users, setUsers] = useState([]);
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

  return (
    <div className="container">
      <div className="row">
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
                  {/* Use ProgressBar component here */}
                  <ProgressBar task={task} />

                  {task?.users?.map((el, userIndex) => (
                    <div key={userIndex} className="p-1">
                      <button type="button" className="btn btn-outline-primary p-1">
                        {el?.name}
                      </button>
                    </div>
                  ))}

                  {task?.categories?.map((el, categoryIndex) => (
                    <div key={categoryIndex} className="p-1">
                      <span className="badge bg-secondary">{el?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-start p-2 gap-2">
                Status: <b>{mapStatusToLabel(task?.status)}</b>
                <button className="btn btn-primary" onClick={() => handleEditClick(task.id)}>
                  Edit Task
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <EditTaskModal show={showEditModal} onHide={() => setShowEditModal(false)} taskId={selectedTaskId} />
    </div>
  );
};

export default Tasks;
