import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EditTaskModal = ({ show, onHide, taskId, onDelete }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: Number(),
    categories: [],
    start_date: '',
    end_date: '',
    user_ids: [],
    admin_id: Number(localStorage.getItem('user_id'))
  });

  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      const usersWithId = response.data.users.map(user => ({ id: user.id, name: user.name }));
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tasks/${taskId}`, { headers: headers });
  
      const taskData = response.data.task;
  
      if (taskData?.user_ids) {
        const selectedUsers = taskData.user_ids.map((userId) => {
          const user = users.find((user) => user.id === userId);
          return user ? { id: userId, name: user.name } : null;
        }).filter(Boolean);
        setSelectedUsers(selectedUsers);
      }

      setTask({
        title: taskData.title || '',
        description: taskData.description || '',
        status: taskData.status || 1,
        start_date: taskData.start_date || '',
        end_date: taskData.end_date || '',
        user_ids: taskData.task_users || [],
        admin_id: Number(localStorage.getItem('user_id')) || 0,
        categories: taskData.task_categories || [],
      });
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  useEffect(() => {
    if (show) {
      fetchTask();
      fetchUsers();
      fetchCategories();
    }
  }, [show, taskId]);

  const toggleUser = (userId, userName) => {
    setSelectedUsers((prevUsers) => {
      const isUserSelected = prevUsers.some((user) => user.id === userId);
      return isUserSelected
        ? prevUsers.filter((user) => user.id !== userId)
        : [...prevUsers, { id: userId, name: userName }];
    });
  
    setTask((prevTask) => {
      const updatedUserIds = selectedUsers.map((user) => user.id);
      return {
        ...prevTask,
        user_ids: updatedUserIds,
      };
    });
  };

  const toggleCategory = (categoryId, categoryName) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.some((category) => category.id === categoryId)
        ? prevCategories.filter((category) => category.id !== categoryId)
        : [...prevCategories, { id: categoryId, name: categoryName }]
    );
  };

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
      user_ids: selectedUsers.map((user) => user.name),
      categories: selectedCategories.map((category) => category.id),
    });
  };

  const handleUpdate = async () => {
    try {
      // Map selected usernames to user IDs
     const selectedUserIds = selectedUsers.map((user) => user.id);
  
      // Update the task object with user_ids as an array of IDs
      const updatedTask = {
        ...task,
        user_ids: selectedUserIds,
      };
  
      const response = await axios.post(`http://localhost:8000/api/tasks/update-task/${taskId}`, updatedTask, { headers: headers });
  
      if (response.status === 200) {
        Swal.fire('Task updated successfully!');
        window.location.href = '/tasks';
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.message,
        });
        console.error('Error updating task:', response.status);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error updating the task!',
      });
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/tasks/delete-task/${taskId}`, { headers: headers });
  
      console.log('Delete Task Response:', response); 
  
      if (response.status === 204) {
        onHide();
        onDelete(taskId);
        Swal.fire('Task deleted successfully!');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error deleting the task!',
        });
        console.error('Error deleting task:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Swal.fire('Error deleting task!');
    }
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Task Title
                </label>
                <input type="text" className="form-control" id="title" name="title" value={task.title} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Task Description
                </label>
                <textarea className="form-control" id="description" name="description" value={task.description} onChange={handleInputChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="start_date" className="form-label">
                  Start Date
                </label>
                <input type="date" className="form-control" id="start_date" name="start_date" value={task.start_date} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="end_date" className="form-label">
                  End Date
                </label>
                <input type="date" className="form-control" id="end_date" name="end_date" value={task.end_date} onChange={handleInputChange} />
              </div>
              <input
                className="form-control mb-4"
                type="text"
                name="users"
                placeholder="Choose from users list"
                aria-label="default input example"
                disabled
                value={selectedUsers.map((user) => user.name).join(', ')}
              />
              <div className="mb-3">
                <label htmlFor="users" className="form-label">
                  Assign Users
                </label>
                <ul className="list-group">
                  {users.map((user) => (
                    <li
                      key={user.name}
                      className={`list-group-item ${selectedUsers.some((selectedUser) => selectedUser.name === user.name) ? 'active' : ''}`}
                      onClick={() => toggleUser(user.id, user.name)}
                    >
                      {user.name}
                    </li>
                  ))}
                </ul>
              </div>
              <input
                className="form-control form-control-sm mb-4"
                type="text"
                placeholder="Choose categories"
                aria-label=".form-control-sm example"
                name="categories"
                disabled
                value={selectedCategories.map((category) => category.name).join(', ')}
              />
              <div className="mb-3">
                <label htmlFor="categories" className="form-label">
                  Select Categories
                </label>
                <ul className="list-group">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className={`list-group-item ${selectedCategories.some((selectedCategory) => selectedCategory.id === category.id) ? 'active' : ''}`}
                      onClick={() => toggleCategory(category.id, category.name)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select className="form-select" id='status' name='status' onChange={handleInputChange}>
                  <option value={1}>In Progress</option>
                  <option value={2}>Completed</option>
                  <option value={3}>Canceled</option>
                </select>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                  Update Task
                </button>
                <button type="button" className="btn btn-danger gap-2" onClick={handleDelete}>
                  Delete Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
