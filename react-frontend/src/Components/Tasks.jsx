import Navbar from './NavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTaskModal from './EditTaskModal';
import ProgressBar from './ProgressBar'; 

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
  const statusColors = ['primary', 'warning', 'info', 'success', 'danger'];
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleEditClick = (taskId) => {
    setSelectedTaskId(taskId);
    setShowEditModal(true);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        //Fetch the tasks
        const response = await axios.get('http://localhost:8000/api/tasks'); 
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    const fetchUsers = async () => {
      try {
        //Fetch the users 
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);

  const handleDeleteTask = (taskId) => {
    console.log(`Task ${taskId} deleted`);
  };

  return (
    <div className="container background">
      <div className="row">
        {tasks.map((task, index) => (
          <div key={task.id} className="col-xs-12 col-sm-8 col-md-6 col-lg-3 my-2 d-flex flex-wrap p-0 m-0">
            <div className={`card border-${statusColors[index % statusColors.length]} my-2 mx-auto`}>
              <div className={`card-header bg-${statusColors[index % statusColors.length]} text-light fw-bold`}>
                {`Task #${task.id}`} <small className="text-body-light float-end">{`from: ${users?.find(el => el?.id == task?.admin_id)?.name}`}</small>
              </div>
              <div className={`card-body text-${statusColors[index % statusColors.length]}`}>
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <p className="card-text">Deadline: {task.end_date}</p>
                <div className="container m-4 p-1 mx-auto">
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
      <EditTaskModal show={showEditModal} onHide={() => setShowEditModal(false)} taskId={selectedTaskId} onDelete={handleDeleteTask} />
    </div>
      </div>
  );
};

export default Tasks;
